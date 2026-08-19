async function injectBlueMercuryHeader() {
  const targetUrl = 'https://bluemercury.com/pages/standalone-header';
  
  // Try multiple CORS proxies as fallbacks
  const proxies = [
    'https://corsproxy.io/?',
    'https://api.allorigins.win/raw?url=',
    'https://cors-anywhere.herokuapp.com/',
  ];
  
  for (const proxyUrl of proxies) {
    try {
      console.log(`Trying proxy: ${proxyUrl}...`);
      const response = await fetch(proxyUrl + encodeURIComponent(targetUrl));
      
      if (!response.ok) {
        console.warn(`Proxy failed with status ${response.status}`);
        continue;
      }
      
      const html = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      
      // Get the sections
      const topBarGroup = doc.querySelector('.shopify-section.shopify-section-group-top-bar-group');
      const headerSection = doc.querySelector('.section-header');
      
      if (topBarGroup && headerSection) {
        // Clone and inject
        const topBarClone = topBarGroup.cloneNode(true);
        const headerClone = headerSection.cloneNode(true);
        
        document.body.insertBefore(headerClone, document.body.firstChild);
        document.body.insertBefore(topBarClone, document.body.firstChild);
        
        console.log('✅ BlueMercury header injected successfully!');
        
        // Inject CSS and JS
        const styles = doc.querySelectorAll('style, link[rel="stylesheet"]');
        const scripts = doc.querySelectorAll('script[src]');
        
        styles.forEach(style => {
          const clone = style.cloneNode(true);
          document.head.appendChild(clone);
        });
        
        scripts.forEach(script => {
          const clone = document.createElement('script');
          if (script.src) clone.src = script.src;
          document.body.appendChild(clone);
        });
        
        return; // Success, exit
      } else {
        console.error('Header elements not found in response');
      }
    } catch (error) {
      console.warn(`Proxy ${proxyUrl} failed:`, error.message);
      continue;
    }
  }
  
  console.error('❌ All proxies failed');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectBlueMercuryHeader);
} else {
  injectBlueMercuryHeader();
}
