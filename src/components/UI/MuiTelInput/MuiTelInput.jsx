import { MuiTelInput } from "mui-tel-input";

const MyTelInput = ({ value, onChange }) => {
  return (
    <MuiTelInput
      style={{ marginBottom: "1rem" }}
      onlyCountries={["UZ"]}
      defaultCountry="UZ"
      fullWidth
      required
      value={value}
      onChange={(newValue) => onChange(newValue)} // Updated to handle direct value
      inputProps={{ maxLength: 17 }}
      InputProps={{ style: { backgroundColor: "white" } }}
    />
  );
};

export default MyTelInput;
