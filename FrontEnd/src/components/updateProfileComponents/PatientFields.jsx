import { useDispatch, useSelector } from 'react-redux';
import { setPatientField } from '../../redux/slices/userProfileSlice';
import { Field, SectionHeading, Input, Select, Icon } from './FormControls';

const BLOOD_TYPES = ['A+','A-','B+','B-','AB+','AB-','O+','O-'].map(b => ({ value: b, label: b }));
const GENDERS = [{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }];

const PatientFields = () => {
    const dispatch = useDispatch();
    const patientProfile = useSelector((state) => state.updateProfile.patientProfile);

    const field = (name) => ({
        value: patientProfile[name],
        onChange: (e) => dispatch(setPatientField({ field: name, value: e.target.value })),
    });

    return (
        <>
            <SectionHeading>Medical Information</SectionHeading>

            <div className="grid grid-cols-2 gap-4">
                <Field label="Blood Type">
                    <Select
                        icon={<Icon path="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />}
                        placeholder="Select blood type"
                        options={BLOOD_TYPES}
                        {...field('bloodType')}
                    />
                </Field>
                <Field label="Gender">
                    <Select
                        icon={<Icon path="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />}
                        placeholder="Select gender"
                        options={GENDERS}
                        {...field('gender')}
                    />
                </Field>
            </div>

            <Field label="Date of Birth">
                <Input
                    icon={<Icon path="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />}
                    type="date"
                    {...field('dateOfBirth')}
                />
            </Field>

            <Field label="Emergency Contact Number">
                <Input
                    icon={<Icon path="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />}
                    type="text"
                    placeholder="01XXXXXXXXX"
                    {...field('emergencyContact')}
                />
            </Field>
        </>
    );
};

export default PatientFields;