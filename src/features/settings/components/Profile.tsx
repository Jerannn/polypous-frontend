import { Mail, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CURRENCIES } from "@/utils/constants";

export default function Profile() {
  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Profile Settings </CardTitle>
        <CardDescription>Update your personal information</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="fullName">Full name</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="fullName"
                  placeholder="e.g. John Doe"
                  // disabled={isLoggingIn}
                  // {...register("email")}
                />
                <InputGroupAddon>
                  <User />
                </InputGroupAddon>
              </InputGroup>
              {/* {errors.email && <FieldError>{errors.email.message}</FieldError>} */}
            </Field>

            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="email"
                  placeholder="e.g. 2V8kD@example.com"
                  // disabled={isLoggingIn}
                  // {...register("email")}
                />
                <InputGroupAddon>
                  <Mail />
                </InputGroupAddon>
              </InputGroup>
              {/* {errors.email && <FieldError>{errors.email.message}</FieldError>} */}
            </Field>

            <Field>
              <FieldLabel htmlFor="currency">Currency</FieldLabel>
              <Select
                defaultValue="EUR"
                onValueChange={(value) => {
                  console.log(value);
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent align="end" position="popper">
                  <SelectGroup>
                    {CURRENCIES.map((currency) => (
                      <SelectItem key={currency.code} value={currency.code}>
                        {currency.symbol} {currency.code}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {/* {errors.email && <FieldError>{errors.email.message}</FieldError>} */}
            </Field>

            <Button type="submit" className="self-end">
              Save changes
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
