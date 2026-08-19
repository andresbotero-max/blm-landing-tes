async function injectBlueMercuryHeader() {
  try {
    // Use CORS proxy to fetch the header
    const proxyUrl = 'https://api.allorigins.win/raw?url=';
    const targetUrl = 'https://bluemercury.com/pages/standalone-header';
    
    console.log('Fetching BlueMercury header...');
    const response = await fetch(proxyUrl + encodeURIComponent(targetUrl));
    const html = await response.text();
    
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    // Get the top bar group
    const topBarGroup = doc.querySelector('.shopify-section.shopify-section-group-top-bar-group');
    
    // Get the header section
    const headerSection = doc.querySelector('.section-header');
    
    if (topBarGroup && headerSection) {
      // Clone and insert at the beginning of body
      const topBarClone = topBarGroup.cloneNode(true);
      const headerClone = headerSection.cloneNode(true);
      
      document.body.insertBefore(headerClone, document.body.firstChild);
      document.body.insertBefore(topBarClone, document.body.firstChild);
      
      console.log('BlueMercury header injected successfully!');
      
      // Also inject the necessary CSS and JS
      const styles = doc.querySelectorAll('style, link[rel="stylesheet"]');
      const scripts = doc.querySelectorAll('script[src]');
      
      styles.forEach(style => {
        const clone = style.cloneNode(true);
        document.head.appendChild(clone);
      });
      
      scripts.forEach(script => {
        const clone = document.createElement('script');
        if (script.src) clone.src = script.src;
        if (script.textContent) clone.textContent = script.textContent;
        document.body.appendChild(clone);
      });
      
    } else {
      console.error('Could not find header elements. Found:', {
        topBarGroup: !!topBarGroup,
        headerSection: !!headerSection
      });
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
