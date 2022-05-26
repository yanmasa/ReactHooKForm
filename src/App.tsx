import "./styles.css";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField
} from "@mui/material";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

export default function App() {
  type Inputs = {
    name: string;
  };

  // useFormで必要な関数を取得、デフォルト値を設定
  const { control, handleSubmit } = useForm<Inputs>({
    defaultValues: { name: "longbridgeyuk" }
  });

  // バリデーションルール
  const validationRules = {
    name: {
      required: "名前を入力してください",
      minLength: { value: 4, message: "4文字以上で入力してください。" }
    }
  };

  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    console.log(`submit: ${data.name}`);
  };

  // ダイアログの開閉イベントハンドラ
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleClickOpen = () => {
    setIsOpen(true);
  };
  const handleClickClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="App">
      <Button variant="outlined" onClick={handleClickOpen}>
        Open alert Dialog
      </Button>
      <Dialog fullWidth maxWidth="xs" open={isOpen}>
        <DialogTitle>DialogTitle</DialogTitle>
        <DialogContent>
          <Stack
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            spacing={2}
            sx={{ m: 2, width: "25ch" }}
          >
            <Controller
              name="name"
              control={control}
              rules={validationRules.name}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  type="text"
                  label="名前"
                  error={fieldState.invalid}
                  helperText={fieldState.error?.message}
                />
              )}
            />
            Dialog message
            <Button color="inherit" type="submit" onClick={handleClickClose}>
              Close
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </div>
  );
}
