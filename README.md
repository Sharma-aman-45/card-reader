# 🚀 Exhibition Card Reader Pro

Advanced AI-powered business card and QR code scanner with integrated image editor for enhanced text extraction.

## ✨ Features

### 📱 Smart Scanning
- **QR Code Detection**: Automatically scans QR codes for vCard and contact data
- **AI Business Card Scanner**: Captures images and uses AI vision for accurate data extraction
- **Camera Integration**: Real-time camera capture with stabilization
- **Drag & Drop**: Easy image upload with drag & drop support

### 🖼️ Image Editor (NEW!)
- **Crop Tool**: Select and crop specific areas of business cards
- **Brightness Adjustment**: Enhance image quality with brightness slider (-100% to +100%)
- **Rotation**: Rotate images in 90° increments for proper alignment
- **Real-time Preview**: See changes instantly as you edit
- **Mobile Support**: Touch-friendly interface for mobile devices

### 🤖 AI-Powered Extraction
- **Multi-Method Processing**: QR codes → AI vision → OCR fallback
- **Enhanced OCR**: Optimized text recognition with Tesseract.js
- **Smart Name Extraction**: Advanced algorithms for accurate name detection
- **Contact Validation**: Email and phone number validation
- **LinkedIn Integration**: Automatic LinkedIn profile search

### 📊 Data Management
- **Client Database**: Store and manage all scanned contacts
- **Export Functionality**: Export data to CSV format
- **Edit & Delete**: Full CRUD operations on client records
- **Statistics**: Track scanning sources and success rates

## 🛠️ How to Use

### 1. Image Upload & Editing
1. **Drag & Drop**: Simply drag an image onto the upload area
2. **File Upload**: Click "Choose File" to select an image
3. **Camera Capture**: Use the camera to capture business cards
4. **Edit Image**: Use the image editor to enhance quality:
   - **Crop**: Click "Select Area" and drag to crop
   - **Brightness**: Use the slider to adjust brightness
   - **Rotate**: Use rotation buttons for proper alignment
5. **Process**: Click "Process Image" to extract contact data

### 2. Image Editor Controls

#### ✂️ Crop Tool
- Click "Select Area" to enter crop mode
- Drag to select the area you want to keep
- Click "Apply Crop" to confirm or "Cancel" to abort
- Visual overlay shows the selected area

#### 💡 Brightness Adjustment
- Use the slider to adjust brightness from -100% to +100%
- Real-time preview shows the effect
- Perfect for enhancing poorly lit images

#### 🔄 Rotation
- Click "↶ -90°" to rotate counterclockwise
- Click "↷ +90°" to rotate clockwise
- Click "Reset" to return to original orientation

#### ⚡ Actions
- **Process Image**: Extract contact data from the edited image
- **Reset All**: Return to the original image

### 3. Data Extraction Process
1. **QR Code Detection**: First tries to find QR codes
2. **AI Vision Processing**: Uses enhanced OCR for text extraction
3. **Contact Parsing**: Extracts name, email, phone, company
4. **LinkedIn Search**: Automatically searches for LinkedIn profiles
5. **Data Storage**: Saves to local database

## 🎯 Optimized Workflow

### For Business Cards:
1. **Capture**: Use camera or upload image
2. **Edit**: Crop to focus on the card, adjust brightness if needed
3. **Process**: Extract contact information
4. **Verify**: Check extracted data accuracy
5. **Save**: Store in client database

### For QR Codes:
1. **Scan**: Point camera at QR code
2. **Parse**: Extract vCard or contact data
3. **Validate**: Verify contact information
4. **Store**: Save to database

## 📱 Mobile Support

The application is fully responsive and includes:
- **Touch-friendly interface** for mobile devices
- **Touch crop selection** for image editing
- **Optimized controls** for small screens
- **Camera integration** for mobile devices

## 🔧 Technical Features

### Image Processing
- **Canvas-based editing** for real-time preview
- **Blob handling** for efficient image processing
- **Multiple format support** (JPEG, PNG, etc.)
- **Quality preservation** during editing

### Data Extraction
- **Multi-layered approach**: QR → AI → OCR
- **Enhanced name extraction** with dataset validation
- **Email validation** with format checking
- **Phone number parsing** with international support

### Performance
- **Optimized rendering** for smooth editing
- **Memory management** for large images
- **Progressive loading** for better UX
- **Error handling** with fallback options

## 📁 File Structure

```
card reader/
├── index.html                 # Main application
├── exhibition_card_reader.html # Alternative version
├── test_image_editor.html     # Test page
├── README.md                  # This file
├── name.txt                   # Name dataset
└── Camera/                    # Sample images
    └── *.jpg                 # Test images
```

## 🚀 Getting Started

1. **Open the application**: Open `index.html` in a modern web browser
2. **Test the features**: Use the test images in the Camera folder
3. **Try the editor**: Upload an image and test the editing features
4. **Process data**: Extract contact information from edited images

## 🎨 UI/UX Features

- **Modern gradient design** with smooth animations
- **Responsive layout** that works on all devices
- **Intuitive controls** with visual feedback
- **Status messages** for user guidance
- **Loading indicators** for long operations

## 🔒 Privacy & Security

- **Local processing**: All image processing happens in the browser
- **No data upload**: Images are processed locally
- **Local storage**: Client data stored in browser localStorage
- **No external dependencies**: Minimal external API calls

## 🐛 Troubleshooting

### Common Issues:
1. **Camera not working**: Check browser permissions
2. **Image not loading**: Verify file format (JPEG, PNG)
3. **Editor not responding**: Refresh the page
4. **OCR not working**: Try adjusting brightness/rotation

### Browser Compatibility:
- **Chrome**: Full support
- **Firefox**: Full support
- **Safari**: Full support
- **Edge**: Full support

## 📈 Future Enhancements

- [ ] **Advanced filters**: Contrast, saturation, sharpness
- [ ] **Batch processing**: Multiple images at once
- [ ] **Cloud storage**: Save data to cloud services
- [ ] **API integration**: Connect to CRM systems
- [ ] **Machine learning**: Improved text recognition
- [ ] **Export formats**: PDF, Excel, JSON

## 🤝 Contributing

Feel free to contribute to this project by:
- Reporting bugs
- Suggesting new features
- Improving the UI/UX
- Optimizing performance

## 📄 License

This project is open source and available under the MIT License.

---

**Made with ❤️ for efficient business card management** 