import React, {  } from 'react'

import UserView from '@/components/admin/user/UserView'


export default async function UserDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  <UserView id={id} />
}