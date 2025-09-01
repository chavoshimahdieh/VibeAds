import { writeFileSync } from 'fs';
import { join } from 'path';

function generateVibeAdMetadata(adData) {
  const metadata = {
    name: adData.name || "VibeAd #1",
    description: adData.description || "Interactive advertisement with vibe-based rules",
    image: adData.imageLocation, // This will be the 0G location after upload
    external_url: adData.externalUrl || "https://vibeads.com/ads/1",
    attributes: [
      {
        trait_type: "AdType",
        value: adData.adType || "Interactive"
      },
      {
        trait_type: "TargetAudience",
        value: adData.targetAudience || "All"
      }
    ],
    vibeRules: {
      timeBased: {
        startTime: adData.startTime || "09:00",
        endTime: adData.endTime || "21:00",
        timezone: adData.timezone || "UTC"
      },
      locationBased: {
        enabled: adData.locationEnabled || false,
        allowedRegions: adData.allowedRegions || []
      },
      contextBased: {
        allowedContent: adData.allowedContent || ["family-friendly", "general"],
        blockedContent: adData.blockedContent || ["explicit", "violent"]
      },
      interactionRules: {
        maxViewsPerUser: adData.maxViews || 10,
        minEngagementTime: adData.minEngagement || 5,
        requiredActions: adData.requiredActions || ["click", "hover"]
      }
    },
    content: {
      primaryImage: adData.imageLocation,
      fallbackImage: adData.fallbackImage || "",
      videoUrl: adData.videoUrl || "",
      interactiveElements: adData.interactiveElements || [
        {
          type: "button",
          position: "bottom-right",
          action: "learn-more"
        }
      ]
    },
    analytics: {
      trackImpressions: adData.trackImpressions !== false,
      trackClicks: adData.trackClicks !== false,
      trackEngagement: adData.trackEngagement !== false
    }
  };

  return metadata;
}

// Example usage
const adData = {
  name: "Summer Sale Campaign",
  description: "Limited time summer sale with exclusive discounts",
  imageLocation: "0g://QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco/image.png",
  startTime: "08:00",
  endTime: "20:00",
  adType: "Promotional",
  targetAudience: "Shoppers"
};

const metadata = generateVibeAdMetadata(adData);

// Save locally for verification (optional)
writeFileSync(
  join(__dirname, '../generated-metadata.json'),
  JSON.stringify(metadata, null, 2)
);

console.log('Metadata generated successfully!');
console.log('Copy this to upload to 0G:');
console.log(JSON.stringify(metadata));

export default { generateVibeAdMetadata };