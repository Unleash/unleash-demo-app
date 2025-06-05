import Plausible from 'plausible-tracker';

// Initialize Plausible
const plausible = Plausible({
  domain: window.location.hostname,
  trackLocalhost: true, // Enable tracking on localhost for testing
});

// Automatically track page views
const { enableAutoPageviews, trackPageview } = plausible;
enableAutoPageviews();

// Track support button clicks with chatbot variant information
export const trackSupportClick = (chatbotVariant: string) => {
  plausible.trackEvent('support_click', {
    props: {
      chatbotVariant,
    },
  });
};

// Track session start with chatbot variant
export const trackSessionStart = (chatbotVariant: string) => {
  plausible.trackEvent('session_start', {
    props: {
      chatbotVariant,
    },
  });
};

// Export the plausible instance for custom tracking needs
export default plausible;