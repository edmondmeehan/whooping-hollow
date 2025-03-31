
export interface HomeSystemItem {
  system: string;
  access: string;
  notes: string;
}

export const homeSystemsData: HomeSystemItem[] = [
  {
    system: 'Internet',
    access: 'Mister / internet1',
    notes: ''
  },
  {
    system: 'Front Door Lock',
    access: 'Assigned to each user',
    notes: ''
  },
  {
    system: 'Back Door Lock',
    access: '9174 + Kwikset button',
    notes: ''
  },
  {
    system: 'Garage Lock',
    access: '3305#',
    notes: ''
  },
  {
    system: 'Owners Closet Lock',
    access: '1231',
    notes: ''
  },
  {
    system: 'Hydrawise Sprinklers',
    access: 'Contact Brookhaven Irrigation for app access',
    notes: ''
  },
  {
    system: 'Hunter Irrigation Clock',
    access: 'Serial # 05FD1D61',
    notes: ''
  },
  {
    system: 'Pentair Screen Logic Pool Heater',
    access: 'Pentair: 07-AE-75 / blank password',
    notes: 'Connect via local connection while on location, connect via remote connection while away; ask JW Poolcare for assistance'
  },
  {
    system: 'TV',
    access: '',
    notes: 'Use Gmatrix remote to power on the TV (wait 10 seconds); use Roku remote to control channels'
  },
  {
    system: 'Music',
    access: '',
    notes: 'Use unbranded remote to connect music to the sound bar speaker; connect via Bluetooth to Amazonbasics08'
  },
  {
    system: 'Alarm (Vendors)',
    access: '9129',
    notes: ''
  }
];
