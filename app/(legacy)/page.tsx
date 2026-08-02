import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isLocale } from "@/i18n/config";
export default async function Page(){const preferred=(await cookies()).get("mulifang-locale")?.value;redirect(`/${isLocale(preferred)?preferred:"en"}`);}
