async function injectBlueMercuryHeader() {
  try {
    const response = await fetch('https://bluemercury.com/pages/standalone-header');
    const html = await response.text();
    
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    // Get the top bar group
    const topBarGroup = doc.querySelector('.shopify-section.shopify-section-group-top-bar-group');
    
    // Get the header section
    const headerSection = doc.querySelector('.section-header');
    
    if (topBarGroup && headerSection) {
      // Insert at the beginning of body
      document.body.insertBefore(headerSection, document.body.firstChild);
      document.body.insertBefore(topBarGroup, document.body.firstChild);
      
      console.log('BlueMercury header injected successfully!');
    } else {
      console.error('Could not find header elements');
    }
  } catch (error) {
    console.error('Error injecting header:', error);
  }
}

// Run when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectBlueMercuryHeader);
} else {
  injectBlueMercuryHeader();
}
