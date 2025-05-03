import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import type { Domain, DomainPayload } from '@/types'

export const domainApi = createApi({
  reducerPath: 'domain',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://6797aa2bc2c861de0c6d964c.mockapi.io/domain',
  }),
  tagTypes: ['Domain'],
  endpoints: (build) => ({
    getDomains: build.query<Domain[], void>({
      query: () => '/',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: 'Domain' as const,
                id,
              })),
              { type: 'Domain', id: 'LIST' },
            ]
          : [{ type: 'Domain', id: 'LIST' }],
    }),

    getDomainById: build.query<Domain, string>({
      query: (id) => `/${id}`,
      providesTags: (_result, _err, id) => [{ type: 'Domain', id }],
    }),

    createDomain: build.mutation<Domain, DomainPayload>({
      query: (newDomain) => ({
        url: '/',
        method: 'POST',
        body: newDomain,
      }),
      invalidatesTags: [{ type: 'Domain', id: 'LIST' }],
    }),

    updateDomain: build.mutation<
      Domain,
      { id: string; data: Partial<DomainPayload> }
    >({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Domain', id }],
    }),

    deleteDomain: build.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: 'Domain', id },
        { type: 'Domain', id: 'LIST' },
      ],
    }),
  }),
})

export const {
  useGetDomainsQuery,
  useGetDomainByIdQuery,
  useCreateDomainMutation,
  useUpdateDomainMutation,
  useDeleteDomainMutation,
} = domainApi
