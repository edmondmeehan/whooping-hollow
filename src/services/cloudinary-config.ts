
interface CloudinaryConfig {
  url: string;
}

class CloudinaryConfiguration {
  private config: CloudinaryConfig | null = null;

  setCloudinaryUrl(url: string) {
    this.config = { url };
    // Optionally, securely store in localStorage
    localStorage.setItem('cloudinary_config', JSON.stringify(this.config));
  }

  getCloudinaryUrl(): string | null {
    // First check if config is already set
    if (this.config?.url) return this.config.url;

    // Then check localStorage
    const storedConfig = localStorage.getItem('cloudinary_config');
    if (storedConfig) {
      this.config = JSON.parse(storedConfig);
      return this.config.url;
    }

    return null;
  }

  clearCloudinaryUrl() {
    this.config = null;
    localStorage.removeItem('cloudinary_config');
  }
}

export const cloudinaryConfig = new CloudinaryConfiguration();
