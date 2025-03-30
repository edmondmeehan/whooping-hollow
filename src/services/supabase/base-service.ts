
import { supabase } from '@/integrations/supabase/client';

/**
 * Checks if Supabase is properly configured
 * @throws Error if Supabase client is not initialized
 */
export const validateSupabaseConnection = () => {
  if (!supabase) {
    console.error('Supabase client is not initialized');
    throw new Error('Supabase credentials are missing. Please check your environment variables.');
  }
};

/**
 * Tests the connection to Supabase
 * @throws Error if connection test fails
 */
export const testSupabaseConnection = async (tableName: string) => {
  try {
    // Simple select query to check connection
    const { error: connectionError } = await supabase
      .from(tableName)
      .select('id')
      .limit(1);
        
    if (connectionError) {
      console.error(`Supabase connection test failed for ${tableName}:`, connectionError);
      
      // Check specifically for table existence issues
      if (connectionError.message.includes('does not exist')) {
        throw new Error(`The ${tableName} table does not exist in the database. Please check your Supabase setup.`);
      }
      
      throw new Error('Could not connect to Supabase database. Please check your connection and credentials.');
    }
    
    console.log(`Connection to Supabase ${tableName} table successful`);
    return true;
  } catch (connectionError: any) {
    console.error(`Supabase connection test failed for ${tableName}:`, connectionError);
    throw new Error(connectionError.message || 'Could not connect to Supabase database. Please check your connection.');
  }
};
