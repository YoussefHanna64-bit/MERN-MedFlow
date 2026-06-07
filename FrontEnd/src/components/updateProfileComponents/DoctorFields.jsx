import { useDispatch, useSelector } from "react-redux";
import {
  setDoctorField,
  setAddress,
  addAddress,
  removeAddress,
  setAssistantPhone,
  addAssistantPhone,
  removeAssistantPhone,
} from "../../redux/slices/userProfileSlice";
import {
  Field,
  SectionHeading,
  Input,
  Textarea,
  Icon,
  RemoveButton,
  AddButton,
} from "./FormControls";

const DoctorFields = () => {
  const dispatch = useDispatch();
  const doctorProfile = useSelector(
    (state) => state.updateProfile.doctorProfile,
  );

  const field = (name) => ({
    value: doctorProfile[name],
    onChange: (e) =>
      dispatch(setDoctorField({ field: name, value: e.target.value })),
  });

  return (
    <>
      <SectionHeading>Doctor Profile</SectionHeading>

      <Field label="Specialization">
        <Input
          icon={
            <Icon path="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          }
          type="text"
          placeholder="e.g. Cardiology & Interventional Medicine"
          {...field("specialization")}
        />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Consultation Fees (EGP)">
          <Input
            icon={
              <Icon path="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            }
            type="number"
            placeholder="200"
            {...field("fees")}
          />
        </Field>
        <Field label="Main Clinic">
          <Input
            icon={
              <Icon path="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            }
            type="text"
            placeholder="Main clinic name"
            {...field("mainClinic")}
          />
        </Field>
      </div>

      <Field label="Description / Bio">
        <Textarea
          icon={<Icon path="M4 6h16M4 12h16M4 18h7" />}
          placeholder="Brief description about your experience and expertise..."
          {...field("description")}
        />
      </Field>

      <Field label="Clinic Addresses">
        <div className="flex flex-col gap-2">
          {doctorProfile.addresses.map((addr, i) => (
            <div key={i} className="flex gap-2">
              <div className="relative flex-1">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary pointer-events-none">
                  <Icon path="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </span>
                <input
                  type="text"
                  value={addr}
                  onChange={(e) =>
                    dispatch(setAddress({ index: i, value: e.target.value }))
                  }
                  placeholder={`Address ${i + 1}`}
                  className="w-full bg-white border-2 border-gray-200 rounded-xl py-3 pl-10 pr-4 text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              {doctorProfile.addresses.length > 1 && (
                <RemoveButton onClick={() => dispatch(removeAddress(i))} />
              )}
            </div>
          ))}
          <AddButton onClick={() => dispatch(addAddress())}>
            Add Address
          </AddButton>
        </div>
      </Field>

      <Field label="Assistant Phone Numbers">
        <div className="flex flex-col gap-2">
          {doctorProfile.assistant_phones.map((phone, i) => (
            <div key={i} className="flex gap-2">
              <div className="relative flex-1">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary pointer-events-none">
                  <Icon path="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </span>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) =>
                    dispatch(
                      setAssistantPhone({ index: i, value: e.target.value }),
                    )
                  }
                  placeholder="01XXXXXXXXX"
                  className="w-full bg-white border-2 border-gray-200 rounded-xl py-3 pl-10 pr-4 text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              {doctorProfile.assistant_phones.length > 1 && (
                <RemoveButton
                  onClick={() => dispatch(removeAssistantPhone(i))}
                />
              )}
            </div>
          ))}
          <AddButton onClick={() => dispatch(addAssistantPhone())}>
            Add Phone
          </AddButton>
        </div>
      </Field>
    </>
  );
};

export default DoctorFields;
