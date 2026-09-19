import React from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Building2,
  CalendarCheck,
  CalendarDays,
  ExternalLink,
  FileText,
  House,
  Image,
  KeyRound,
  LayoutTemplate,
  Mail,
  MapPinned,
  Users,
  Wrench,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from '@/components/ui/sidebar';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';

const sections = [
  { value: 'bookings', label: 'Bookings', icon: CalendarDays },
  { value: 'availability', label: 'Availability', icon: CalendarCheck },
  { value: 'properties', label: 'Properties', icon: Building2 },
  { value: 'local-area', label: 'Local Area', icon: MapPinned },
  { value: 'hero', label: 'Home Page', icon: LayoutTemplate },
  { value: 'site-content', label: 'Page Content', icon: FileText },
  { value: 'guide', label: 'Guest Guide', icon: BookOpen },
  { value: 'images', label: 'Images', icon: Image },
  { value: 'newsletter', label: 'Newsletter', icon: Mail },
  { value: 'services', label: 'House Services', icon: Wrench },
  { value: 'apis', label: 'API Keys', icon: KeyRound },
  { value: 'users', label: 'Users', icon: Users },
  { value: 'welcome-email', label: 'Welcome Email', icon: Mail },
];

export const adminSections = sections;

const AdminSidebar = () => {
  const { state, setOpenMobile } = useSidebar();
  const collapsed = state === 'collapsed';

  return (
    <Sidebar collapsible="icon" className="border-admin-line bg-admin-surface">
      <SidebarHeader className="h-24 justify-center border-b border-admin-line px-4">
        <Link to="/" className="flex min-w-0 items-center gap-3" aria-label="Whooping Hollow home">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-admin-gold text-admin-gold-text">
            <House className="h-4 w-4" />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="truncate text-sm font-bold uppercase text-admin-ink">Whooping Hollow</p>
              <p className="mt-1 text-[10px] font-semibold uppercase text-admin-muted">Administration</p>
            </div>
          )}
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-2 py-5">
        <SidebarGroup className="p-0">
          <SidebarGroupLabel className="px-3 text-[10px] font-bold uppercase text-admin-muted">
            Manage
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <TabsList className="flex h-auto w-full flex-col items-stretch gap-1 bg-transparent p-0">
              {sections.map(({ value, label, icon: Icon }) => (
                <SidebarMenuItem key={value}>
                  <TabsTrigger
                    value={value}
                    title={collapsed ? label : undefined}
                    onClick={() => setOpenMobile(false)}
                    className="h-10 w-full justify-start gap-3 rounded-sm px-3 text-sm font-medium text-admin-body shadow-none hover:bg-admin-strip hover:text-admin-ink data-[state=active]:bg-admin-strip data-[state=active]:text-admin-ink data-[state=active]:shadow-none group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0"
                  >
                    <Icon className="h-4 w-4 shrink-0 data-[state=active]:text-admin-gold-text" />
                    {!collapsed && <span className="truncate">{label}</span>}
                  </TabsTrigger>
                </SidebarMenuItem>
              ))}
            </TabsList>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-admin-line p-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <Link
              to="/"
              className="flex h-9 items-center gap-3 rounded-sm px-2 text-xs font-semibold uppercase text-admin-muted transition-colors hover:bg-admin-strip hover:text-admin-ink"
              title={collapsed ? 'View site' : undefined}
            >
              <ExternalLink className="h-4 w-4 shrink-0" />
              {!collapsed && <span>View site</span>}
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

export default AdminSidebar;