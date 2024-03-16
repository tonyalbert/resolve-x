<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'
import { authUser } from '~/auth/authUser';

const route = useRoute()

if (!['operator', 'user'].includes(route.params.type?.toString())) {
  throw createError({ statusCode: 404, statusMessage: 'Página não encontrada' })
}

const type = computed(() => route.params.type)

const isLoading = ref(false)

const schema = object({
  email: string().email('Email invalido').required('Obrigatório'),
  password: string()
    .min(8, 'Deve ter pelo menos 8 caracteres')
    .required('Obrigatório')
})

type Schema = InferType<typeof schema>

const state = reactive({
  email: undefined,
  password: undefined
})

async function onSubmit (event: FormSubmitEvent<Schema>) {
  isLoading.value = true

  const result = await authUser.login({
    email: event.data.email,
    password: event.data.password,
    type: type.value.toString()
  })

  isLoading.value = false

  if (!result.error) {
    navigateTo('/')
  }

  return;
}

</script>

<template>
  <main class="h-screen flex items-center justify-center">
    <div class="w-96 border px-6 py-8 rounded-lg border-gray-800">

      <div class="mb-6 text-center">
        <h1 class="text-3xl font-bold">Resolve-X</h1>
        <p class="text-gray-500">Login como {{ type === 'operator' ? 'Operador' : 'Solicitante' }}</p>
      </div>

      <UForm :schema="schema" :state="state" class="space-y-6 flex flex-col " @submit="onSubmit">
        <UFormGroup label="Email" name="email">
          <UInput v-model="state.email" />
        </UFormGroup>

        <UFormGroup label="Senha" name="password">
          <UInput v-model="state.password" type="password" />
        </UFormGroup>

        <UButton color="black" variant="solid" v-if="!isLoading" class="justify-center text-white" type="submit">
            Entrar
        </UButton>

        <UButton color="black" variant="solid" v-if="isLoading" loading class="justify-center" type="submit">
            Entrar
        </UButton>
      </UForm>
    </div>
  </main>
</template>

