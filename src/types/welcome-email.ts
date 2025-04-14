
export interface WelcomeEmailData {
  guestName: string;
  checkInDate: Date;
  checkOutDate: Date;
  phoneNumber: string;
  specialInstructions?: string;
  property: 'whooping_hollow' | 'nashville_downtown' | 'nashville_music_row';
}

export interface WelcomeEmailTemplate {
  subject: string;
  html: string;
}
