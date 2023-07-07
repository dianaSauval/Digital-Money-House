import {
  Controller,
  Control,
  FieldValues,
  Path,
  PathValue,
} from "react-hook-form";
import { TextField, Typography, Box, TextFieldVariants } from "@mui/material";

interface InputType<T extends FieldValues = FieldValues> {
  control: Control<T>;
  name: Path<T>;
  type: string;
  label: string;
  defaultValue?: PathValue<T, Path<T>>;
  errorMessage?: string;
  variant?: TextFieldVariants;
  size?: "small" | "medium";
  id?: string | number;
  value?: string;
  onFocusCapture?: ({ target }: any) => void
}

const ControlledInput = <T extends FieldValues = FieldValues>({
  control,
  name,
  type,
  label,
  defaultValue,
  errorMessage,
  variant,
  size,
}: InputType<T>) => {
  return (
    <Box
      sx={{
        position: "relative",
      }}
    >
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { name, value, onChange }, field }) => (
          <TextField
            {...field}
            type={type}
            name={name}
            value={value}
            label={label}
            sx={{
              backgroundColor: "white",
              borderRadius: "8px"
            }}
            variant={variant}
            onChange={onChange}
            size={size}
            fullWidth
          />
        )}
      />
      {errorMessage && <Typography variant="error">{errorMessage}</Typography>}
    </Box>
  );
};

export default ControlledInput;
