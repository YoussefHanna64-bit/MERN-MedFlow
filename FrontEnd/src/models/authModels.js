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
  mainClinic: formState.mainClinic?.trim(),
  assistant_phones: formState.assistantPhones
    ? formState.assistantPhones
        .split(",")
        .map((phone) => phone.trim())
        .filter(Boolean)
    : [],
  specialization: formState.specialization?.trim(),
  addresses: formState.addresses
    .split("-")
    .map((address) => address.trim())
    .filter(Boolean),
  fees: Number(formState.fees),
  description: formState.description?.trim() || undefined,
});

export const createAdminAuthModel = (formState) => ({
  name: formState.name?.trim(),
  email: formState.email?.trim().toLowerCase(),
  password: formState.password,
  phone: formState.phone?.trim(),
  role: "admin",
});
