"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import CompanyHeader from "@/components/companies/detail/CompanyHeader";
import CompanyInfoCard from "@/components/companies/detail/CompanyInfoCard";
import CompanyContactsCard from "@/components/companies/detail/CompanyContactsCard";
import CompanyActivitiesCard from "@/components/companies/detail/CompanyActivitiesCard";
import CompanyDialog from "@/components/companies/CompanyDialog";

import {
  companyService,
  Company,
} from "@/services/company.service";

import {
  contactService,
  Contact,
} from "@/services/contact.service";

import {
  activityService,
  Activity,
} from "@/services/activity.service";


export default function CompanyDetailPage() {

  const router = useRouter();
  const params = useParams();

  const [company, setCompany] =
    useState<Company | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [dialogOpen, setDialogOpen] =
    useState(false);

  const [contacts, setContacts] =
    useState<Contact[]>([]);

  const [activities, setActivities] =
    useState<Activity[]>([]);

  async function loadCompany() {
    try {

      setLoading(true);

      const data =
        await companyService.getCompany(
          params.id as string,
        );

      setCompany(data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }
  }

  async function loadContacts() {
    try {

      const data =
        await contactService.getCompanyContacts(
          params.id as string,
        );

      setContacts(data);

    } catch (error) {

      console.error(error);

    }
  }

  async function handleDeleteCompany() {

  const ok = window.confirm(
    `¿Está seguro de eliminar la empresa "${company?.razonSocial}"?\n\n` +
    "También se eliminarán los contactos y actividades asociadas.\n\n" +
    "Esta acción no se puede deshacer."
  );

  if (!ok || !company) return;

  try {

    await companyService.deleteCompany(
      company.id,
    );

    alert("Empresa eliminada correctamente.");

    router.push("/companies");

  } catch (error: any) {

    console.error(error);

    alert(
      "No fue posible eliminar la empresa."
    );

  }

}

  async function loadActivities() {
    try {

      const data =
        await activityService.getCompanyActivities(
          params.id as string,
        );

      setActivities(data);

    } catch (error) {

      console.error(error);

    }
  }

  useEffect(() => {

    loadCompany();
    loadContacts();
    loadActivities();

  }, [params]);

  if (loading) {
    return (
      <div className="p-8">
        Cargando empresa...
      </div>
    );
  }

  if (!company) {
    return (
      <div className="p-8">
        Empresa no encontrada.
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">

        <CompanyHeader
          companyName={
          company.nombreFantasia ||
          company.razonSocial
   }
          companyType={company.tipo}
          onBack={() =>
          router.push("/companies")
  }
          onEdit={() =>
          setDialogOpen(true)
  }
          onDelete={handleDeleteCompany}
          />

        <CompanyInfoCard
          razonSocial={company.razonSocial}
          rut={company.rut}
          giro={company.giro}
          direccion={company.direccion}
          comuna={company.comuna}
          region={company.region}
          telefono={company.telefono}
          email={company.email}
          sitioWeb={company.sitioWeb}
        />

        <CompanyContactsCard
          companyId={company.id}
          contacts={contacts}
          onContactsChanged={loadContacts}
        />

        <CompanyActivitiesCard
          companyId={company.id}
          userId="cmqzg8b450000g42ehnt1ky65"
          activities={activities}
          onActivitiesChanged={loadActivities}
        />

      </div>

      <CompanyDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        company={company}
        onSuccess={async () => {
          await loadCompany();
          setDialogOpen(false);
        }}
      />

    </>
  );
}