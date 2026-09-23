import { Input, NativeSelect, Textarea } from "@/components/ui/input";
import { Field } from "@/components/qr/panel";
import type { FieldMap, QrKind } from "@/lib/qr/types";

export function ContentForm({
  kind,
  fields,
  onChange,
}: {
  kind: QrKind;
  fields: FieldMap;
  onChange: (patch: Partial<FieldMap>) => void;
}) {
  const set = (key: keyof FieldMap) => (event: { target: { value: string } }) =>
    onChange({ [key]: event.target.value } as Partial<FieldMap>);

  switch (kind) {
    case "text":
      return (
        <Field label="Teks" htmlFor="qr-text">
          <Textarea
            id="qr-text"
            value={fields.text}
            onChange={set("text")}
            placeholder="Tulis pesan, kode, atau catatan…"
          />
        </Field>
      );
    case "url":
      return (
        <Field label="URL" htmlFor="qr-url" hint="https akan ditambahkan otomatis jika kosong.">
          <Input
            id="qr-url"
            value={fields.url}
            onChange={set("url")}
            inputMode="url"
            placeholder="arrizalgfx.com"
          />
        </Field>
      );
    case "whatsapp":
      return (
        <div className="grid gap-3">
          <Field label="Nomor WhatsApp" htmlFor="qr-wa-phone" hint="Contoh: 0812… atau 62…">
            <Input
              id="qr-wa-phone"
              value={fields.waPhone}
              onChange={set("waPhone")}
              inputMode="tel"
              placeholder="081234567890"
            />
          </Field>
          <Field label="Pesan (opsional)" htmlFor="qr-wa-text">
            <Textarea
              id="qr-wa-text"
              value={fields.waText}
              onChange={set("waText")}
              placeholder="Halo, saya dari…"
            />
          </Field>
        </div>
      );
    case "wifi":
      return (
        <div className="grid gap-3">
          <Field label="SSID" htmlFor="qr-wifi-ssid">
            <Input
              id="qr-wifi-ssid"
              value={fields.wifiSsid}
              onChange={set("wifiSsid")}
              placeholder="Nama jaringan"
            />
          </Field>
          <Field label="Enkripsi" htmlFor="qr-wifi-enc">
            <NativeSelect
              id="qr-wifi-enc"
              value={fields.wifiEnc}
              onChange={(event) =>
                onChange({
                  wifiEnc: event.target.value as FieldMap["wifiEnc"],
                })
              }
            >
              <option value="WPA">WPA / WPA2 / WPA3</option>
              <option value="WEP">WEP</option>
              <option value="nopass">Tanpa sandi</option>
            </NativeSelect>
          </Field>
          {fields.wifiEnc !== "nopass" ? (
            <Field label="Kata sandi" htmlFor="qr-wifi-pass">
              <Input
                id="qr-wifi-pass"
                type="text"
                autoComplete="off"
                value={fields.wifiPass}
                onChange={set("wifiPass")}
                placeholder="Password"
              />
            </Field>
          ) : null}
          <label className="flex h-11 items-center gap-2 text-sm">
            <input
              type="checkbox"
              className="size-4 accent-primary"
              checked={fields.wifiHidden === "true"}
              onChange={(event) =>
                onChange({ wifiHidden: event.target.checked ? "true" : "false" })
              }
            />
            Jaringan tersembunyi
          </label>
        </div>
      );
    case "email":
      return (
        <div className="grid gap-3">
          <Field label="Email" htmlFor="qr-email">
            <Input
              id="qr-email"
              type="email"
              value={fields.emailTo}
              onChange={set("emailTo")}
              placeholder="nama@domain.com"
            />
          </Field>
          <Field label="Subjek (opsional)" htmlFor="qr-email-subject">
            <Input
              id="qr-email-subject"
              value={fields.emailSubject}
              onChange={set("emailSubject")}
            />
          </Field>
          <Field label="Isi (opsional)" htmlFor="qr-email-body">
            <Textarea
              id="qr-email-body"
              value={fields.emailBody}
              onChange={set("emailBody")}
            />
          </Field>
        </div>
      );
    case "phone":
      return (
        <Field label="Nomor telepon" htmlFor="qr-phone">
          <Input
            id="qr-phone"
            inputMode="tel"
            value={fields.phone}
            onChange={set("phone")}
            placeholder="+62 812 0000 0000"
          />
        </Field>
      );
    case "sms":
      return (
        <div className="grid gap-3">
          <Field label="Nomor" htmlFor="qr-sms-phone">
            <Input
              id="qr-sms-phone"
              inputMode="tel"
              value={fields.smsPhone}
              onChange={set("smsPhone")}
            />
          </Field>
          <Field label="Pesan (opsional)" htmlFor="qr-sms-body">
            <Textarea
              id="qr-sms-body"
              value={fields.smsBody}
              onChange={set("smsBody")}
            />
          </Field>
        </div>
      );
    case "vcard":
      return (
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Field label="Nama" htmlFor="qr-v-name">
              <Input id="qr-v-name" value={fields.vName} onChange={set("vName")} />
            </Field>
          </div>
          <Field label="Telepon" htmlFor="qr-v-phone">
            <Input id="qr-v-phone" value={fields.vPhone} onChange={set("vPhone")} />
          </Field>
          <Field label="Email" htmlFor="qr-v-email">
            <Input id="qr-v-email" type="email" value={fields.vEmail} onChange={set("vEmail")} />
          </Field>
          <Field label="Perusahaan" htmlFor="qr-v-company">
            <Input id="qr-v-company" value={fields.vCompany} onChange={set("vCompany")} />
          </Field>
          <Field label="Website" htmlFor="qr-v-url">
            <Input id="qr-v-url" value={fields.vUrl} onChange={set("vUrl")} />
          </Field>
        </div>
      );
    case "location":
      return (
        <div className="grid gap-3">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Latitude" htmlFor="qr-lat">
              <Input
                id="qr-lat"
                inputMode="decimal"
                value={fields.locLat}
                onChange={set("locLat")}
                placeholder="-6.2088"
              />
            </Field>
            <Field label="Longitude" htmlFor="qr-lng">
              <Input
                id="qr-lng"
                inputMode="decimal"
                value={fields.locLng}
                onChange={set("locLng")}
                placeholder="106.8456"
              />
            </Field>
          </div>
          <Field label="Atau alamat" htmlFor="qr-address">
            <Input
              id="qr-address"
              value={fields.locAddress}
              onChange={set("locAddress")}
              placeholder="Jakarta, Indonesia"
            />
          </Field>
        </div>
      );
    default:
      return null;
  }
}
