import api from '../utils/api';
import { SiteSettings } from '../types/global';

export const getSiteSettings = async (): Promise<SiteSettings> => {
  const response = await api.get<SiteSettings>('/site-settings');
  return response.data;
};

export const updateSiteSettings = async (settings: Partial<SiteSettings>): Promise<SiteSettings> => {
  const response = await api.put<SiteSettings>('/site-settings', settings);
  return response.data;
};

export const updateSEOSettings = async (seoSettings: Pick<SiteSettings, 'siteName' | 'siteDescription' | 'siteKeywords'>): Promise<SiteSettings> => {
  const response = await api.put<SiteSettings>('/site-settings/seo', seoSettings);
  return response.data;
};

export const updateSocialMediaLinks = async (socialMediaLinks: SiteSettings['socialMediaLinks']): Promise<SiteSettings> => {
  const response = await api.put<SiteSettings>('/site-settings/social', { socialMediaLinks });
  return response.data;
};

export const updateLogo = async (logoUrl: string): Promise<SiteSettings> => {
  const response = await api.put<SiteSettings>('/site-settings/logo', { logoUrl });
  return response.data;
};