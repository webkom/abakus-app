import Icon from '@/components/icon';
import { Card, CardContent } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { components } from '@/lib/types/schema';
import { cn } from '@/lib/utils';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import { Linking, TouchableOpacity, View } from 'react-native';

type BusinessDetailsProps = {
  company?: components['schemas']['CompanyDetail'] | null;
  className?: string;
};

export function BusinessDetails({ company, className }: BusinessDetailsProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageLoadError, setImageLoadError] = useState(false);

  if (!company || !company.name) {
    return null;
  }

  const handleOpenWebsite = () => {
    if (!company.website) return;
    const url = company.website.startsWith('http') ? company.website : `https://${company.website}`;
    void Linking.openURL(url).catch((err) => console.error('Failed to open website:', err));
  };

  const handleOpenMap = () => {
    if (!company.address) return;
    const url = `https://maps.google.com/?q=${encodeURIComponent(company.address)}`;
    void Linking.openURL(url).catch((err) => console.error('Failed to open map:', err));
  };

  const handleCallPhone = () => {
    if (!company.phone) return;
    void Linking.openURL(`tel:${company.phone}`).catch((err) =>
      console.error('Failed to call phone:', err)
    );
  };

  const hasContactInfo = Boolean(company.website || company.address || company.phone);
  const descriptionLength = company.description?.length ?? 0;
  const isLongDescription = descriptionLength > 220;

  const displayDescription =
    isLongDescription && !isExpanded
      ? `${company.description?.slice(0, 220)}...`
      : company.description;

  const primaryLogo = company.logo;
  const fallbackLogo = company.logoPlaceholder;
  const activeImageUri = !imageLoadError && primaryLogo ? primaryLogo : fallbackLogo;

  return (
    <View className={cn('gap-3', className)}>
      {/* Section Header */}
      <View className="flex-row items-center gap-2 px-1">
        <Icon name="Building2" size={20} className="text-primary" />
        <Text className="text-lg font-bold text-foreground">Om bedriften</Text>
      </View>

      {/* Main Card */}
      <Card className="overflow-hidden border-border bg-card py-4 shadow-sm">
        <CardContent className="gap-4">
          {/* Header Row: Logo & Company Name */}
          <View className="flex-row items-center gap-3.5">
            {activeImageUri ? (
              <View className="h-16 w-16 items-center justify-center overflow-hidden rounded-xl border border-border bg-secondary/30 p-2">
                <Image
                  source={{ uri: activeImageUri }}
                  contentFit="contain"
                  onError={() => {
                    if (!imageLoadError) {
                      setImageLoadError(true);
                    }
                  }}
                  style={{ width: '100%', height: '100%' }}
                />
              </View>
            ) : (
              <View className="h-16 w-16 items-center justify-center rounded-xl border border-border bg-secondary p-2">
                <Icon name="Building2" size={28} className="text-muted-foreground" />
              </View>
            )}

            <View className="flex-1 gap-1">
              <Text className="text-xl font-bold text-foreground">{company.name}</Text>
              {company.companyType && (
                <View className="self-start rounded-full border border-border bg-secondary px-2.5 py-0.5">
                  <Text className="text-xs font-medium text-secondary-foreground">
                    {company.companyType}
                  </Text>
                </View>
              )}
            </View>
          </View>

          {/* Description Section */}
          {company.description && (
            <View className="gap-2 border-t border-border pt-3">
              <Text className="text-sm leading-6 text-muted-foreground">{displayDescription}</Text>
              {isLongDescription && (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setIsExpanded(!isExpanded)}
                  className="flex-row items-center gap-1 self-start py-1">
                  <Text className="text-xs font-semibold text-primary">
                    {isExpanded ? 'Vis mindre' : 'Vis mer'}
                  </Text>
                  <Icon
                    name={isExpanded ? 'ChevronUp' : 'ChevronDown'}
                    size={14}
                    className="text-primary"
                  />
                </TouchableOpacity>
              )}
            </View>
          )}

          {/* Contact Details & Quick Links */}
          {hasContactInfo && (
            <View className="gap-2 border-t border-border pt-3">
              <Text className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Kontaktinformasjon
              </Text>

              <View className="gap-2">
                {company.website && (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={handleOpenWebsite}
                    className="flex-row items-center justify-between rounded-lg border border-border/60 bg-muted/40 p-2.5">
                    <View className="flex-1 flex-row items-center gap-2.5 pr-2">
                      <Icon name="Globe" size={16} className="text-primary" />
                      <Text className="text-xs font-medium text-foreground" numberOfLines={1}>
                        {company.website.replace(/^https?:\/\//, '')}
                      </Text>
                    </View>
                    <Icon name="ExternalLink" size={14} className="text-muted-foreground" />
                  </TouchableOpacity>
                )}

                {company.address && (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={handleOpenMap}
                    className="flex-row items-center justify-between rounded-lg border border-border/60 bg-muted/40 p-2.5">
                    <View className="flex-1 flex-row items-center gap-2.5 pr-2">
                      <Icon name="MapPin" size={16} className="text-primary" />
                      <Text className="text-xs font-medium text-foreground" numberOfLines={1}>
                        {company.address}
                      </Text>
                    </View>
                    <Icon name="ExternalLink" size={14} className="text-muted-foreground" />
                  </TouchableOpacity>
                )}

                {company.phone && (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={handleCallPhone}
                    className="flex-row items-center justify-between rounded-lg border border-border/60 bg-muted/40 p-2.5">
                    <View className="flex-1 flex-row items-center gap-2.5 pr-2">
                      <Icon name="Phone" size={16} className="text-primary" />
                      <Text className="text-xs font-medium text-foreground">{company.phone}</Text>
                    </View>
                    <Icon name="PhoneCall" size={14} className="text-muted-foreground" />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )}
        </CardContent>
      </Card>
    </View>
  );
}

export default BusinessDetails;
