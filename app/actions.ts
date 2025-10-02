'use server'

import { z } from 'zod'

type ActionState = {
  errors?: Record<string, string[] | undefined>;
  message?: string | null;
  success?: boolean;
}

// --- Esquema de Validación para Reporte ---
const reportSchema = z.object({
  report: z
    .string()
    .min(10, { message: 'El reporte debe tener al menos 10 caracteres.' }),
})

// --- Acción para Guardar Reporte ---
export async function saveReport(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const validatedFields = reportSchema.safeParse({
    report: formData.get('report'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: null,
      success: false,
    }
  }

  // Simulación de latencia de red
  await new Promise((resolve) => setTimeout(resolve, 1000))

  console.log('Nuevo reporte recibido:', validatedFields.data.report)

  return {
    message: '¡Gracias! Tu reporte ha sido enviado y será revisado.',
    errors: {},
    success: true,
  }
}

// --- Esquema de Validación para Inscripción a Evento ---
const registrationSchema = z.object({
  name: z.string().min(3, { message: 'El nombre es requerido.' }),
  email: z
    .string()
    .email({ message: 'Por favor, introduce un correo válido.' }),
  eventName: z.string(),
})

// --- Acción para Registrarse en Evento ---
export async function registerForEvent(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const validatedFields = registrationSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    eventName: formData.get('eventName'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: null,
      success: false,
    }
  }

  // Simulación de latencia de red
  await new Promise((resolve) => setTimeout(resolve, 1500))

  console.log(
    `Nuevo registro para ${validatedFields.data.eventName}:`,
    `Nombre: ${validatedFields.data.name}, Email: ${validatedFields.data.email}`,
  )

  return {
    message: `¡Inscripción exitosa, ${validatedFields.data.name}! Te hemos enviado un correo de confirmación.`,
    errors: {},
    success: true,
  }
}

// --- Acción para Incrementar el Contador de Compartir ---
export async function incrementShareCount() {
  // Simulación de latencia de red
  await new Promise((resolve) => setTimeout(resolve, 500))
  console.log('Contador de compartidos incrementado')
  return { message: 'Share count incremented' }
}
