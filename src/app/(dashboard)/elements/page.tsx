'use client';

import FootballPitch from "@/components/FootballPitch";
import ViewToggle from "@/components/ViewToggle";
import SelectButton from "@/components/SelectButton";
import TillidCard from "@/components/TillidCard";
import SearchInput from "@/components/SearchInput";
import AlertButton from "@/components/AlertButton";
import UserAvatar from "@/components/UserAvatar";
import ReceiptCard from "@/components/ReceiptCard";
import RatingCard from "@/components/RatingCard";
import RatingSelect from "@/components/RatingSelect";
import { Bell, ChevronRight, Search } from "lucide-react";

export default function ElementsPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: '80px', alignItems: 'flex-start' }}>
      
      {/* Left side: Toggles & Icons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
        
        {/* Top bar elements */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <ViewToggle />
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center', color: '#666', paddingLeft: '8px' }}>
            <Bell size={20} />
            <ChevronRight size={20} />
            <Search size={20} />
          </div>
        </div>

        {/* Action Buttons (Alert & Avatar) */}
        <div>
          <p style={{ fontSize: '11px', fontWeight: 600, color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>Top Bar Actions</p>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            {/* Click to test alert state toggle */}
            <AlertButton initialHasAlert={false} />
            <UserAvatar initials="MQ" />
          </div>
        </div>

        {/* Select Buttons */}
        <div>
          <p style={{ fontSize: '11px', fontWeight: 600, color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>Select Button</p>
          <div style={{ display: 'flex', gap: '16px' }}>
            <SelectButton label="2016" defaultActive={false} />
          </div>
        </div>

        {/* Tillid & Rating Cards */}
        <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
          <div>
            <p style={{ fontSize: '11px', fontWeight: 600, color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>Tillidsnøjagtighed Kort</p>
            <TillidCard />
          </div>
          <div>
            <p style={{ fontSize: '11px', fontWeight: 600, color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>Rating Kort</p>
            <RatingCard grade="A" score={5} />
          </div>
        </div>

        {/* Search Input */}
        <div>
          <p style={{ fontSize: '11px', fontWeight: 600, color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>Search Input</p>
          <SearchInput />
        </div>

        {/* Rating Selector */}
        <div>
          <p style={{ fontSize: '11px', fontWeight: 600, color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>Rating Selector</p>
          <RatingSelect />
        </div>

        {/* Receipt Popup Card */}
        <div>
          <p style={{ fontSize: '11px', fontWeight: 600, color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>Receipt Popup</p>
          <ReceiptCard />
        </div>

      </div>

      {/* Right side: Football Pitch */}
      <FootballPitch />

    </div>
  );
}
