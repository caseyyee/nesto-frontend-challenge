'use server';

import { revalidateTag } from 'next/cache';

export async function revalidateApplications() {
  revalidateTag('applications');
}