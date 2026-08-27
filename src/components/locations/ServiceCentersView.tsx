"use client";

import AppointmentProvider, { useAppointment } from "@/components/aftersales/AppointmentProvider";
import { LocationHero, LocationExplorer, LocationContact, BookServiceButton } from "./Locations";
import { SERVICE_CENTERS } from "@/lib/locationsData";

function Inner() {
  const { open } = useAppointment();
  return (
    <>
      <LocationHero data={SERVICE_CENTERS.hero} action={<BookServiceButton onBook={() => open()} />} />
      <LocationExplorer
        locations={SERVICE_CENTERS.locations}
        sectionTitle={SERVICE_CENTERS.sectionTitle}
        sectionDescription={SERVICE_CENTERS.sectionDescription}
        idBase="service"
        onBook={() => open()}
      />
      <LocationContact />
    </>
  );
}

export default function ServiceCentersView() {
  return (
    <AppointmentProvider>
      <Inner />
    </AppointmentProvider>
  );
}
