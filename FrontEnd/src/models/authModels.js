export const createPatientAuthModel = (formState) => ({
  name: formState.name?.trim(),
  email: formState.email?.trim().toLowerCase(),
  password: formState.password,
  phone: formState.phone?.trim(),
  role: "patient",
  bloodType: formState.bloodType,
  dateOfBirth: formState.dateOfBirth || undefined,
  gender: formState.gender || undefined,
  emergencyContact: formState.emergencyContact?.trim() || undefined,
});

export const createDoctorAuthModel = (formState) => ({
  name: formState.name?.trim(),
  email: formState.email?.trim().toLowerCase(),
  password: formState.password,
  phone: formState.phone?.trim(),
  role: "doctor",
  specialization: formState.specialization?.trim(),
  addresses: formState.addresses
    .split("-")
    .map((address) => address.trim())
    .filter(Boolean),
  fees: Number(formState.fees),
  description: formState.description?.trim() || undefined,
});
