
import { supabase } from '@/integrations/supabase/client';
import { 
  ExternalServiceLink, 
  ExternalServiceLinkInput 
} from '@/hooks/admin/use-external-links';
import { BaseService } from '../supabase/base-service';

export class ExternalLinksService extends BaseService {
  private static instance: ExternalLinksService;

  private constructor() {
    super();
  }

  public static getInstance(): ExternalLinksService {
    if (!ExternalLinksService.instance) {
      ExternalLinksService.instance = new ExternalLinksService();
    }
    return ExternalLinksService.instance;
  }

  public async getExternalLinks(): Promise<ExternalServiceLink[]> {
    const { data, error } = await supabase
      .from('external_links')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching external links:', error);
      throw new Error(`Failed to fetch external links: ${error.message}`);
    }

    return data || [];
  }

  public async createExternalLink(link: ExternalServiceLinkInput): Promise<ExternalServiceLink> {
    const { data, error } = await supabase
      .from('external_links')
      .insert([link])
      .select('*')
      .single();

    if (error) {
      console.error('Error creating external link:', error);
      throw new Error(`Failed to create external link: ${error.message}`);
    }

    return data;
  }

  public async updateExternalLink(id: string, link: Partial<ExternalServiceLinkInput>): Promise<ExternalServiceLink> {
    const { data, error } = await supabase
      .from('external_links')
      .update(link)
      .eq('id', id)
      .select('*')
      .single();

    if (error) {
      console.error('Error updating external link:', error);
      throw new Error(`Failed to update external link: ${error.message}`);
    }

    return data;
  }

  public async deleteExternalLink(id: string): Promise<void> {
    const { error } = await supabase
      .from('external_links')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting external link:', error);
      throw new Error(`Failed to delete external link: ${error.message}`);
    }
  }
}
