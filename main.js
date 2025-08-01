// Mindee API Integration for Business Card Extraction
// This file handles the Mindee API calls for enhanced business card data extraction

class MindeeAPI {
    constructor(apiKey = '4ac6925023b8961a6475865dd6ed9853') {
        this.apiKey = apiKey;
        this.baseURL = 'https://api.mindee.net/v1/products/mindee/business_card/v1';
        this.headers = {
            'Authorization': `Token ${apiKey}`,
            'Content-Type': 'multipart/form-data'
        };
    }

    /**
     * Extract business card data using Mindee API
     * @param {File|string} document - File object, URL, or base64 string
     * @param {boolean} async - Whether to use async processing
     * @returns {Promise<Object>} - Extracted business card data
     */
    async extractBusinessCardData(document, async = false) {
        try {
            if (async) {
                return await this.extractAsync(document);
            } else {
                return await this.extractSync(document);
            }
        } catch (error) {
            console.error('Mindee API Error:', error);
            throw error;
        }
    }

    /**
     * Synchronous extraction (direct response)
     */
    async extractSync(document) {
        const formData = new FormData();
        
        if (typeof document === 'string') {
            // Handle base64 or URL
            if (document.startsWith('data:')) {
                // Convert base64 to blob
                const response = await fetch(document);
                const blob = await response.blob();
                formData.append('document', blob, 'business_card.jpg');
            } else if (document.startsWith('http')) {
                // URL
                formData.append('document', document);
            } else {
                // Assume base64 without data URL prefix
                const blob = this.base64ToBlob(document);
                formData.append('document', blob, 'business_card.jpg');
            }
        } else {
            // File object
            formData.append('document', document);
        }

        const response = await fetch(`${this.baseURL}/predict`, {
            method: 'POST',
            headers: {
                'Authorization': `Token ${this.apiKey}`
            },
            body: formData
        });

        if (!response.ok) {
            throw new Error(`Mindee API Error: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();
        return this.parseMindeeResponse(result);
    }

    /**
     * Asynchronous extraction (job-based)
     */
    async extractAsync(document) {
        // Step 1: Submit job
        const jobId = await this.submitJob(document);
        
        // Step 2: Poll for results
        return await this.pollJobStatus(jobId);
    }

    /**
     * Submit a job for async processing
     */
    async submitJob(document) {
        const formData = new FormData();
        
        if (typeof document === 'string') {
            if (document.startsWith('data:')) {
                const response = await fetch(document);
                const blob = await response.blob();
                formData.append('document', blob, 'business_card.jpg');
            } else if (document.startsWith('http')) {
                formData.append('document', document);
            } else {
                const blob = this.base64ToBlob(document);
                formData.append('document', blob, 'business_card.jpg');
            }
        } else {
            formData.append('document', document);
        }

        const response = await fetch(`${this.baseURL}/predict_async`, {
            method: 'POST',
            headers: {
                'Authorization': `Token ${this.apiKey}`
            },
            body: formData
        });

        if (!response.ok) {
            throw new Error(`Mindee API Error: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();
        return result.job_id;
    }

    /**
     * Poll job status until completion
     */
    async pollJobStatus(jobId, maxAttempts = 30, delay = 2000) {
        for (let attempt = 0; attempt < maxAttempts; attempt++) {
            const response = await fetch(`${this.baseURL}/documents/queue/${jobId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Token ${this.apiKey}`
                }
            });

            if (!response.ok) {
                throw new Error(`Mindee API Error: ${response.status} ${response.statusText}`);
            }

            const result = await response.json();
            
            if (result.status === 'completed') {
                return this.parseMindeeResponse(result);
            } else if (result.status === 'failed') {
                throw new Error('Mindee processing failed');
            }

            // Wait before next poll
            await new Promise(resolve => setTimeout(resolve, delay));
        }

        throw new Error('Mindee processing timeout');
    }

    /**
     * Parse Mindee API response into standardized format
     */
    parseMindeeResponse(response) {
        try {
            const document = response.document;
            const prediction = document.inference.prediction;

            const extractedData = {
                name: '',
                email: '',
                phone: '',
                company: '',
                jobTitle: '',
                website: '',
                address: '',
                confidence: 0,
                rawResponse: response
            };

            // Extract name
            if (prediction.name && prediction.name.length > 0) {
                const nameField = prediction.name[0];
                extractedData.name = nameField.value || '';
                extractedData.confidence = Math.max(extractedData.confidence, nameField.confidence || 0);
            }

            // Extract email
            if (prediction.emails && prediction.emails.length > 0) {
                const emailField = prediction.emails[0];
                extractedData.email = emailField.value || '';
                extractedData.confidence = Math.max(extractedData.confidence, emailField.confidence || 0);
            }

            // Extract phone
            if (prediction.phone_numbers && prediction.phone_numbers.length > 0) {
                const phoneField = prediction.phone_numbers[0];
                extractedData.phone = phoneField.value || '';
                extractedData.confidence = Math.max(extractedData.confidence, phoneField.confidence || 0);
            }

            // Extract company
            if (prediction.company_names && prediction.company_names.length > 0) {
                const companyField = prediction.company_names[0];
                extractedData.company = companyField.value || '';
                extractedData.confidence = Math.max(extractedData.confidence, companyField.confidence || 0);
            }

            // Extract job title
            if (prediction.job_titles && prediction.job_titles.length > 0) {
                const jobTitleField = prediction.job_titles[0];
                extractedData.jobTitle = jobTitleField.value || '';
                extractedData.confidence = Math.max(extractedData.confidence, jobTitleField.confidence || 0);
            }

            // Extract website
            if (prediction.websites && prediction.websites.length > 0) {
                const websiteField = prediction.websites[0];
                extractedData.website = websiteField.value || '';
                extractedData.confidence = Math.max(extractedData.confidence, websiteField.confidence || 0);
            }

            // Extract address
            if (prediction.addresses && prediction.addresses.length > 0) {
                const addressField = prediction.addresses[0];
                extractedData.address = addressField.value || '';
                extractedData.confidence = Math.max(extractedData.confidence, addressField.confidence || 0);
            }

            return extractedData;

        } catch (error) {
            console.error('Error parsing Mindee response:', error);
            return {
                name: '',
                email: '',
                phone: '',
                company: '',
                jobTitle: '',
                website: '',
                address: '',
                confidence: 0,
                error: error.message
            };
        }
    }

    /**
     * Convert base64 string to blob
     */
    base64ToBlob(base64) {
        const byteCharacters = atob(base64);
        const byteNumbers = new Array(byteCharacters.length);
        
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        
        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], { type: 'image/jpeg' });
    }

    /**
     * Get confidence level description
     */
    getConfidenceLevel(confidence) {
        if (confidence >= 0.9) return 'Very High';
        if (confidence >= 0.7) return 'High';
        if (confidence >= 0.5) return 'Medium';
        if (confidence >= 0.3) return 'Low';
        return 'Very Low';
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MindeeAPI;
} else if (typeof window !== 'undefined') {
    window.MindeeAPI = MindeeAPI;
} 