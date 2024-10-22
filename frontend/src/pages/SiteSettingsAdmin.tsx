import React, { useState, useEffect } from 'react';
import { getSiteSettings, updateSiteSettings, updateSEOSettings, updateSocialMediaLinks } from '../api/siteSettings';
import { SiteSettings } from '../types/global';

const SiteSettingsAdmin: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await getSiteSettings();
        setSettings(data);
      } catch (err) {
        setError('Failed to fetch site settings');
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    setError('');
    setSuccess('');
    
    try {
      await updateSiteSettings(settings);
      setSuccess('Settings updated successfully');
    } catch (err) {
      setError('Failed to update settings');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!settings) return <div>Error loading settings</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8">Site Settings</h1>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">{error}</div>
      )}
      {success && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-md">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Settings */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">General Settings</h2>
          
          <div className="space-y-4">
            <div>
              <label 
                htmlFor="siteName" 
                className="block text-sm font-medium text-gray-700"
              >
                Site Name
              </label>
              <input
                type="text"
                id="siteName"
                value={settings.siteName}
                onChange={(e) => setSettings({
                  ...settings,
                  siteName: e.target.value
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>

            <div>
              <label 
                htmlFor="siteDescription" 
                className="block text-sm font-medium text-gray-700"
              >
                Site Description
              </label>
              <textarea
                id="siteDescription"
                value={settings.siteDescription}
                onChange={(e) => setSettings({
                  ...settings,
                  siteDescription: e.target.value
                })}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>
          </div>
        </section>

        {/* SEO Settings */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">SEO Settings</h2>
          
          <div className="space-y-4">
            <div>
              <label 
                htmlFor="siteKeywords" 
                className="block text-sm font-medium text-gray-700"
              >
                Keywords (comma-separated)
              </label>
              <input
                type="text"
                id="siteKeywords"
                value={settings.siteKeywords.join(', ')}
                onChange={(e) => setSettings({
                  ...settings,
                  siteKeywords: e.target.value.split(',').map(k => k.trim())
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>
          </div>
        </section>

        {/* Social Media Links */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Social Media Links</h2>
          
          <div className="space-y-4">
            {Object.entries(settings.socialMediaLinks).map(([platform, url]) => (
              <div key={platform}>
                <label 
                  htmlFor={platform} 
                  className="block text-sm font-medium text-gray-700 capitalize"
                >
                  {platform}
                </label>
                <input
                  type="url"
                  id={platform}
                  value={url || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    socialMediaLinks: {
                      ...settings.socialMediaLinks,
                      [platform]: e.target.value
                    }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>
            ))}
          </div>
        </section>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default SiteSettingsAdmin;