import type { Messages } from "./en";

export const es: Messages = {
  // App
  loading: "Estableciendo Conexión Segura...",

  // Greetings
  good_morning: "Buenos días",
  good_afternoon: "Buenas tardes",
  good_evening: "Buenas noches",

  // Jobs page
  jobs_today_one: "Trabajo Hoy",
  jobs_today_other: "Trabajos Hoy",
  no_jobs_today: "No hay trabajos asignados hoy",
  no_jobs_contact: "Actualiza o contacta a Despacho si esperabas trabajo.",
  offline: "Sin conexión",
  events_pending_sync: "eventos pendientes de sincronización",

  // Priority labels
  priority_urgent: "URGENTE",
  priority_turnover: "ROTACIÓN",
  priority_pte: "PTE",
  priority_standard: "ESTÁNDAR",

  // Job detail — status
  shift_not_started: "Turno No Iniciado",
  shift_active: "Turno Activo",
  rest_period: "Período de Descanso",
  session_ended: "Sesión Terminada",
  service_pending: "Servicio Pendiente",
  clock_in_label: "Entrada:",
  break_label: "Descanso:",

  // Compliance warnings
  rest_break_reminder: "Recordatorio: Es hora de tu descanso de 10 minutos.",
  meal_break_required: "Descanso requerido: La ley de CA requiere 30 min sin pago para turnos de más de 5 horas.",
  second_meal_break: "Se requiere un segundo descanso para turnos de más de 10 horas.",

  // Location
  locking_position: "Obteniendo Ubicación...",
  location_unavailable: "Ubicación No Disponible (GPS Inactivo)",

  // Toasts
  toast_clocked_in: "Entrada Registrada",
  toast_break_started: "Descanso Iniciado",
  toast_break_ended: "Descanso Terminado",
  toast_clocked_out: "Salida Registrada",
  toast_shift_required: "Se requiere activar el turno para ver los detalles del trabajo",
  toast_flag_success: "Problema reportado — despacho notificado",
  toast_time_off_success: "Solicitud de tiempo libre enviada",
  toast_time_off_error: "Error al enviar — intenta de nuevo",
  toast_error_start_shift: "Error al iniciar turno — intenta de nuevo",

  // Navigation
  nav_hours: "Horas",

  // Error states
  fetch_error: "Sin conexión al servidor",
  btn_retry: "Intentar de nuevo",

  // Job detail — sections
  section_contact: "Punto de Contacto",
  section_scope: "Alcance del Trabajo",
  section_docs: "Documentación",

  // Job detail — tenant
  tenant_not_listed: "Inquilino No Registrado",
  no_access_info: "Sin información de acceso del despachador.",

  // Action buttons
  btn_start_shift: "Iniciar Turno",
  btn_clock_in: "Registrar Entrada",
  btn_clock_in_loading: "Registrando...",
  btn_rest: "Período de Descanso",
  btn_end_shift: "Terminar Turno",
  btn_mark_complete: "Marcar como Completado",
  btn_resume: "Reanudar Trabajo",
  btn_verified_complete: "Verificado Completo",

  // Flag issue
  flag_title: "Reportar un Problema",
  flag_subtitle: "Notificar a Robert inmediatamente",
  flag_placeholder: "Puerta cerrada, inquilino no permite acceso, pieza necesaria...",
  btn_flag_submit: "Enviar Reporte",
  btn_flag_loading: "Enviando Alerta...",

  // Job completion
  job_complete: "Trabajo Completado",
  excellent_work: "Excelente trabajo.",

  // Attestation
  attestation_title: "Confirmar Tu Tiempo",
  attestation_subtitle: "Certificación Legal Requerida",
  attestation_text: "Confirmo que mi registro de entrada, descansos y salida de hoy son correctos y completos.",
  btn_attestation_confirm: "Confirmo",
  btn_attestation_loading: "Guardando certificación...",
  attestation_footer: "Requerido por la política de APT Maintenance",

  // Camera upload
  camera_before: "Documentación Previa",
  camera_after: "Documentación Posterior",
  camera_receipt: "Documentación de Recibo",
  camera_ready: "Listo para Transmitir",
  btn_camera_upload: "Enviar a Despacho",
  camera_uploading: "Transmitiendo...",
  camera_success: "Autenticado y Guardado",
  camera_error: "Error de Carga — Verifica Conexión",
  btn_camera_retry: "Reintentar",

  // Calendar
  calendar_title: "Calendario",
  calendar_subtitle: "Tiempo libre y disponibilidad del equipo",
  btn_today: "Hoy",
  day_mon: "Lun",
  day_tue: "Mar",
  day_wed: "Mié",
  day_thu: "Jue",
  day_fri: "Vie",
  day_sat: "Sáb",
  day_sun: "Dom",
  no_timeoff_today: "No hay tiempo libre aprobado este día.",
  leave_sick: "Enfermedad",
  leave_vacation: "Vacaciones",
  label_out: "FUERA",
  calendar_more: "más",
  calendar_close: "Cerrar ✕",

  // Time off
  timeoff_title: "Tiempo Libre",
  timeoff_subtitle: "Solicitud y Saldo",
  balance_sick: "Licencia por Enfermedad",
  balance_vacation: "Vacaciones",
  accrued: "acumulado",
  used: "usado",
  sick_auto_approve: "Las solicitudes de licencia por enfermedad se aprueban automáticamente según la ley de California. No se requiere aprobación del gerente.",
  form_new_request: "Nueva Solicitud",
  leave_personal: "Personal",
  label_start_date: "Fecha de Inicio",
  label_end_date: "Fecha de Fin",
  label_notes: "Notas (Opcional)",
  notes_placeholder: "Cualquier información para Ana o Keith...",
  btn_submit_request: "Enviar Solicitud",
  btn_submitting: "Enviando...",
  request_submitted: "Solicitud Enviada",
  request_submitted_note: "Ana revisará y responderá.",
  error_submission: "Error al enviar — intenta de nuevo",
  past_requests: "Solicitudes Anteriores",
  status_pending: "Pendiente",
  status_approved: "Aprobado",
  status_denied: "Denegado",
};
