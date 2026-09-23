import { o as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { i as signOut } from "./client-CVqXY6bk.mjs";
import { n as cn, t as Button } from "./button-DrQLw21j.mjs";
import { a as hasGateSessionMarker } from "./server-Dd5C3fnE.mjs";
import { i as useCurrentUser, n as BrandMark } from "./login-screen-QyTzvYC2.mjs";
import { _ as Contact, a as Sun, c as Moon, d as MapPin, f as Mail, g as Copy, h as Download, l as MessageSquareText, m as ImagePlus, n as Wifi, o as RotateCcw, p as Link2, r as Type, s as Phone, t as X, u as MessageCircle } from "../_libs/lucide-react.mjs";
import { recordVisit } from "./visits-ypoHHTCp.mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { i as SliderTrack, n as SliderRange, r as SliderThumb, t as Slider$1 } from "../_libs/@radix-ui/react-slider+[...].mjs";
import { n as SwitchThumb, t as Switch$1 } from "../_libs/radix-ui__react-switch.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/studio-BgPnINBp.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Input({ className, type, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("h-11 w-full min-w-0 rounded-lg border border-input bg-background px-3 text-sm text-foreground shadow-[var(--shadow-border)] transition-[box-shadow,border-color] duration-150 placeholder:text-muted-foreground/80 focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 disabled:opacity-50", className),
		...props
	});
}
function Textarea({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("min-h-24 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground shadow-[var(--shadow-border)] placeholder:text-muted-foreground/80 focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40", className),
		...props
	});
}
function NativeSelect({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
		className: cn("h-11 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground shadow-[var(--shadow-border)] focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40", className),
		...props
	});
}
function Panel({ title, description, children, className, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: cn("rounded-2xl bg-card p-5 text-card-foreground shadow-[var(--shadow-border)]", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "mb-4 flex items-start justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-sm font-semibold tracking-tight",
				children: title
			}), description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-0.5 text-xs text-muted-foreground",
				children: description
			}) : null] }), action]
		}), children]
	});
}
function Field({ label, htmlFor, hint, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1.5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				htmlFor,
				className: "text-xs font-medium text-muted-foreground",
				children: label
			}),
			children,
			hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: hint
			}) : null
		]
	});
}
function ContentForm({ kind, fields, onChange }) {
	const set = (key) => (event) => onChange({ [key]: event.target.value });
	switch (kind) {
		case "text": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			label: "Teks",
			htmlFor: "qr-text",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
				id: "qr-text",
				value: fields.text,
				onChange: set("text"),
				placeholder: "Tulis pesan, kode, atau catatan…"
			})
		});
		case "url": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			label: "URL",
			htmlFor: "qr-url",
			hint: "https akan ditambahkan otomatis jika kosong.",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				id: "qr-url",
				value: fields.url,
				onChange: set("url"),
				inputMode: "url",
				placeholder: "arrizalgfx.com"
			})
		});
		case "whatsapp": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Nomor WhatsApp",
				htmlFor: "qr-wa-phone",
				hint: "Contoh: 0812… atau 62…",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "qr-wa-phone",
					value: fields.waPhone,
					onChange: set("waPhone"),
					inputMode: "tel",
					placeholder: "081234567890"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Pesan (opsional)",
				htmlFor: "qr-wa-text",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					id: "qr-wa-text",
					value: fields.waText,
					onChange: set("waText"),
					placeholder: "Halo, saya dari…"
				})
			})]
		});
		case "wifi": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "SSID",
					htmlFor: "qr-wifi-ssid",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "qr-wifi-ssid",
						value: fields.wifiSsid,
						onChange: set("wifiSsid"),
						placeholder: "Nama jaringan"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Enkripsi",
					htmlFor: "qr-wifi-enc",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(NativeSelect, {
						id: "qr-wifi-enc",
						value: fields.wifiEnc,
						onChange: (event) => onChange({ wifiEnc: event.target.value }),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "WPA",
								children: "WPA / WPA2 / WPA3"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "WEP",
								children: "WEP"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "nopass",
								children: "Tanpa sandi"
							})
						]
					})
				}),
				fields.wifiEnc !== "nopass" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Kata sandi",
					htmlFor: "qr-wifi-pass",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "qr-wifi-pass",
						type: "text",
						autoComplete: "off",
						value: fields.wifiPass,
						onChange: set("wifiPass"),
						placeholder: "Password"
					})
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex h-11 items-center gap-2 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "checkbox",
						className: "size-4 accent-primary",
						checked: fields.wifiHidden === "true",
						onChange: (event) => onChange({ wifiHidden: event.target.checked ? "true" : "false" })
					}), "Jaringan tersembunyi"]
				})
			]
		});
		case "email": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Email",
					htmlFor: "qr-email",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "qr-email",
						type: "email",
						value: fields.emailTo,
						onChange: set("emailTo"),
						placeholder: "nama@domain.com"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Subjek (opsional)",
					htmlFor: "qr-email-subject",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "qr-email-subject",
						value: fields.emailSubject,
						onChange: set("emailSubject")
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Isi (opsional)",
					htmlFor: "qr-email-body",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						id: "qr-email-body",
						value: fields.emailBody,
						onChange: set("emailBody")
					})
				})
			]
		});
		case "phone": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			label: "Nomor telepon",
			htmlFor: "qr-phone",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				id: "qr-phone",
				inputMode: "tel",
				value: fields.phone,
				onChange: set("phone"),
				placeholder: "+62 812 0000 0000"
			})
		});
		case "sms": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Nomor",
				htmlFor: "qr-sms-phone",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "qr-sms-phone",
					inputMode: "tel",
					value: fields.smsPhone,
					onChange: set("smsPhone")
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Pesan (opsional)",
				htmlFor: "qr-sms-body",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					id: "qr-sms-body",
					value: fields.smsBody,
					onChange: set("smsBody")
				})
			})]
		});
		case "vcard": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3 sm:grid-cols-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "sm:col-span-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Nama",
						htmlFor: "qr-v-name",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "qr-v-name",
							value: fields.vName,
							onChange: set("vName")
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Telepon",
					htmlFor: "qr-v-phone",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "qr-v-phone",
						value: fields.vPhone,
						onChange: set("vPhone")
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Email",
					htmlFor: "qr-v-email",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "qr-v-email",
						type: "email",
						value: fields.vEmail,
						onChange: set("vEmail")
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Perusahaan",
					htmlFor: "qr-v-company",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "qr-v-company",
						value: fields.vCompany,
						onChange: set("vCompany")
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Website",
					htmlFor: "qr-v-url",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "qr-v-url",
						value: fields.vUrl,
						onChange: set("vUrl")
					})
				})
			]
		});
		case "location": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Latitude",
					htmlFor: "qr-lat",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "qr-lat",
						inputMode: "decimal",
						value: fields.locLat,
						onChange: set("locLat"),
						placeholder: "-6.2088"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Longitude",
					htmlFor: "qr-lng",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "qr-lng",
						inputMode: "decimal",
						value: fields.locLng,
						onChange: set("locLng"),
						placeholder: "106.8456"
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Atau alamat",
				htmlFor: "qr-address",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "qr-address",
					value: fields.locAddress,
					onChange: set("locAddress"),
					placeholder: "Jakarta, Indonesia"
				})
			})]
		});
		default: return null;
	}
}
var EMPTY_FIELDS = {
	text: "",
	url: "",
	waPhone: "",
	waText: "",
	wifiSsid: "",
	wifiPass: "",
	wifiEnc: "WPA",
	wifiHidden: "false",
	emailTo: "",
	emailSubject: "",
	emailBody: "",
	phone: "",
	smsPhone: "",
	smsBody: "",
	vName: "",
	vPhone: "",
	vEmail: "",
	vCompany: "",
	vUrl: "",
	locLat: "",
	locLng: "",
	locAddress: ""
};
var DEFAULT_STYLE = {
	fg: "#0b0f14",
	bg: "#ffffff",
	useGradient: false,
	gradientTo: "#a78bfa",
	dotType: "extra-rounded",
	cornerSquareType: "extra-rounded",
	cornerDotType: "dot",
	ecLevel: "Q",
	size: 320,
	margin: 12,
	logoDataUrl: null,
	logoName: "",
	logoSize: .32,
	hideBackgroundDots: true
};
var KIND_META = [
	{
		id: "text",
		label: "Teks",
		hint: "Teks bebas"
	},
	{
		id: "url",
		label: "URL",
		hint: "Tautan situs"
	},
	{
		id: "whatsapp",
		label: "WhatsApp",
		hint: "Chat WA"
	},
	{
		id: "wifi",
		label: "WiFi",
		hint: "SSID & sandi"
	},
	{
		id: "email",
		label: "Email",
		hint: "mailto"
	},
	{
		id: "phone",
		label: "Telepon",
		hint: "Panggilan"
	},
	{
		id: "sms",
		label: "SMS",
		hint: "Pesan singkat"
	},
	{
		id: "vcard",
		label: "vCard",
		hint: "Kontak"
	},
	{
		id: "location",
		label: "Lokasi",
		hint: "Peta / geo"
	}
];
function HistoryList({ items, onRestore, onClear }) {
	if (items.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted-foreground",
		children: "Belum ada riwayat. Tekan Buat QR atau unduh untuk menyimpan."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "space-y-1.5",
			children: items.map((item) => {
				const kind = KIND_META.find((entry) => entry.id === item.kind)?.label ?? item.kind;
				const time = new Date(item.createdAt).toLocaleString("id-ID", {
					hour: "2-digit",
					minute: "2-digit",
					day: "numeric",
					month: "short"
				});
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => onRestore(item),
					className: "flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left transition-colors hover:bg-accent",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "w-16 shrink-0 text-xs font-medium text-primary",
							children: kind
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "min-w-0 flex-1 truncate text-sm",
							children: item.label
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "shrink-0 font-mono text-[11px] tabular-nums text-muted-foreground",
							children: time
						})
					]
				}) }, item.id);
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			type: "button",
			variant: "ghost",
			size: "sm",
			onClick: onClear,
			children: "Hapus riwayat"
		})]
	});
}
function QrLive({ options, className }) {
	const hostRef = (0, import_react.useRef)(null);
	const qrRef = (0, import_react.useRef)(null);
	const optionsRef = (0, import_react.useRef)(options);
	optionsRef.current = options;
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		const host = hostRef.current;
		if (!host) return void 0;
		import("../_libs/qr-code-styling.mjs").then((n) => /* @__PURE__ */ __toESM(n.t())).then(({ default: QRCodeStyling }) => {
			if (cancelled || !hostRef.current) return;
			hostRef.current.innerHTML = "";
			const qr = new QRCodeStyling({
				width: 320,
				height: 320,
				type: "canvas",
				data: "https://arrizalgfx.com",
				dotsOptions: {
					color: "#0b0f14",
					type: "extra-rounded"
				},
				backgroundOptions: { color: "#ffffff" }
			});
			qr.append(hostRef.current);
			qrRef.current = qr;
			if (optionsRef.current) qr.update(optionsRef.current);
		});
		return () => {
			cancelled = true;
			qrRef.current = null;
			host.innerHTML = "";
		};
	}, []);
	(0, import_react.useEffect)(() => {
		if (!options || !qrRef.current) return;
		qrRef.current.update(options);
	}, [options]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: hostRef,
		className: cn("qr-host", className)
	});
}
function Slider({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Slider$1, {
		className: cn("relative flex h-11 w-full touch-none items-center", className),
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderTrack, {
			className: "relative h-1.5 w-full grow overflow-hidden rounded-full bg-muted",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderRange, { className: "absolute h-full bg-primary" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderThumb, { className: "block size-4 rounded-full border border-primary bg-primary-foreground shadow-[var(--shadow-border)] focus-visible:ring-2 focus-visible:ring-ring" })]
	});
}
function Switch({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
		className: cn("peer inline-flex h-6 w-11 shrink-0 items-center rounded-full border border-border bg-muted transition-colors data-[state=checked]:bg-primary focus-visible:ring-2 focus-visible:ring-ring", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, { className: "pointer-events-none block size-5 translate-x-0.5 rounded-full bg-card-foreground shadow-sm transition-transform data-[state=checked]:translate-x-[22px] data-[state=checked]:bg-primary-foreground" })
	});
}
function ColorField({ label, value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
		label,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "color",
				value: safeHex(value),
				onChange: (event) => onChange(event.target.value),
				className: "size-11 cursor-pointer rounded-lg border border-input bg-card p-1",
				"aria-label": label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value,
				onChange: (event) => onChange(event.target.value),
				className: "font-mono uppercase",
				maxLength: 7
			})]
		})
	});
}
function safeHex(value) {
	return /^#[0-9a-fA-F]{6}$/.test(value) ? value : "#000000";
}
function StyleForm({ style, onChange }) {
	function onLogo(file) {
		if (!file) return;
		if (file.size > 1e6) return;
		const reader = new FileReader();
		reader.onload = () => {
			onChange({
				logoDataUrl: String(reader.result),
				logoName: file.name,
				ecLevel: "H"
			});
		};
		reader.readAsDataURL(file);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorField, {
					label: "Foreground (Warna depan)",
					value: style.fg,
					onChange: (fg) => onChange({ fg })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorField, {
					label: "Background (Warna latar)",
					value: style.bg,
					onChange: (bg) => onChange({ bg })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3 rounded-xl bg-muted/60 px-3 py-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium",
					children: "Gradient"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: "Linear pada titik QR"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
					checked: style.useGradient,
					onCheckedChange: (checked) => onChange({ useGradient: checked }),
					"aria-label": "Gradient"
				})]
			}),
			style.useGradient ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorField, {
				label: "Gradient ke",
				value: style.gradientTo,
				onChange: (gradientTo) => onChange({ gradientTo })
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Dot Style (Gaya titik)",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(NativeSelect, {
							value: style.dotType,
							onChange: (event) => onChange({ dotType: event.target.value }),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "square",
									children: "Square"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "rounded",
									children: "Rounded"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "extra-rounded",
									children: "Extra-rounded"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "dots",
									children: "Dots"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "classy",
									children: "Classy"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "classy-rounded",
									children: "Classy rounded"
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Corner Square (Sudut luar)",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(NativeSelect, {
							value: style.cornerSquareType,
							onChange: (event) => onChange({ cornerSquareType: event.target.value }),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "square",
									children: "Square"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "extra-rounded",
									children: "Extra-rounded"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "dot",
									children: "Dot"
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Corner Dot (Sudut dalam)",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(NativeSelect, {
							value: style.cornerDotType,
							onChange: (event) => onChange({ cornerDotType: event.target.value }),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "square",
								children: "Square"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "dot",
								children: "Dot"
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Error Correction (Koreksi error)",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(NativeSelect, {
							value: style.logoDataUrl ? "H" : style.ecLevel,
							disabled: Boolean(style.logoDataUrl),
							onChange: (event) => onChange({ ecLevel: event.target.value }),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "L",
									children: "L — 7%"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "M",
									children: "M — 15%"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "Q",
									children: "Q — 25%"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "H",
									children: "H — 30%"
								})
							]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-1 flex items-center justify-between text-xs text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Size (Ukuran, px)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono tabular-nums text-foreground",
					children: style.size
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
				min: 240,
				max: 512,
				step: 8,
				value: [style.size],
				onValueChange: ([size]) => onChange({ size })
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-1 flex items-center justify-between text-xs text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Quiet Zone (Margin)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono tabular-nums text-foreground",
					children: style.margin
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
				min: 0,
				max: 32,
				step: 1,
				value: [style.margin],
				onValueChange: ([margin]) => onChange({ margin })
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium text-muted-foreground",
					children: "Logo tengah"
				}), style.logoDataUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 rounded-xl bg-muted/60 p-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: style.logoDataUrl,
							alt: "",
							className: "size-12 rounded-md object-contain outline outline-1 -outline-offset-1 outline-border"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-sm",
								children: style.logoName || "Logo"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Koreksi error otomatis H"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							size: "icon",
							variant: "ghost",
							"aria-label": "Hapus logo",
							onClick: () => onChange({
								logoDataUrl: null,
								logoName: ""
							}),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex h-24 cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-border bg-muted/40 text-xs text-muted-foreground transition-colors hover:bg-accent",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, { className: "size-4" }),
						"Unggah PNG, JPG, atau SVG",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "file",
							accept: "image/png,image/jpeg,image/svg+xml,image/webp",
							className: "sr-only",
							onChange: (event) => onLogo(event.target.files?.[0])
						})
					]
				})]
			}),
			style.logoDataUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-1 flex items-center justify-between text-xs text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Ukuran logo" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "font-mono tabular-nums text-foreground",
					children: [Math.round(style.logoSize * 100), "%"]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
				min: .18,
				max: .42,
				step: .01,
				value: [style.logoSize],
				onValueChange: ([logoSize]) => onChange({ logoSize })
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3 rounded-xl bg-muted/60 px-3 py-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium",
					children: "Sembunyikan titik di belakang logo"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: "Hide background dots"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
					checked: style.hideBackgroundDots,
					onCheckedChange: (checked) => onChange({ hideBackgroundDots: checked })
				})]
			})] }) : null
		]
	});
}
var ICONS = {
	text: Type,
	url: Link2,
	whatsapp: MessageCircle,
	wifi: Wifi,
	email: Mail,
	phone: Phone,
	sms: MessageSquareText,
	vcard: Contact,
	location: MapPin
};
function TypePicker({ value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-wrap gap-1.5",
		role: "tablist",
		"aria-label": "Jenis QR",
		children: KIND_META.map((item) => {
			const Icon = ICONS[item.id];
			const active = item.id === value;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				role: "tab",
				"aria-selected": active,
				onClick: () => onChange(item.id),
				className: cn("inline-flex h-10 items-center gap-1.5 rounded-lg px-3 text-xs font-medium transition-colors duration-150", active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
					className: "size-3.5",
					strokeWidth: 2
				}), item.label]
			}, item.id);
		})
	});
}
var subscribeToNothing = () => () => {};
var noGateSessionOnServer = () => false;
/**
* Minimal signed-in identity chip + sign-out. Restyle freely (see the
* `design-ui` skill). Sign-out is only shown when auth is enabled (the
* disabled-auth dev user has nothing to sign out of) and the session is not
* gate-materialized — behind the gate the next request signs the viewer
* straight back in, so a sign-out control there is a broken loop.
*/
function UserButton() {
	const user = useCurrentUser();
	const [signingOut, setSigningOut] = (0, import_react.useState)(false);
	const gateSession = (0, import_react.useSyncExternalStore)(subscribeToNothing, hasGateSessionMarker, noGateSessionOnServer);
	if (!user) return null;
	const label = user.displayName ?? user.primaryEmail ?? "Account";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		children: [
			user.profileImageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: user.profileImageUrl,
				alt: "",
				className: "h-8 w-8 rounded-full object-cover"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid h-8 w-8 place-items-center rounded-full bg-black/10 text-sm font-medium dark:bg-white/20",
				children: label.charAt(0).toUpperCase()
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm font-medium",
				children: label
			}),
			!gateSession && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				disabled: signingOut,
				onClick: () => {
					setSigningOut(true);
					signOut().catch(() => setSigningOut(false));
				},
				className: "cursor-pointer text-sm underline-offset-4 opacity-70 hover:underline disabled:cursor-wait disabled:no-underline",
				children: signingOut ? "Signing out…" : "Sign out"
			})
		]
	});
}
async function loadLib() {
	return (await import("../_libs/qr-code-styling.mjs").then((n) => /* @__PURE__ */ __toESM(n.t()))).default;
}
function toBlob(raw, type) {
	if (raw instanceof Blob) return raw;
	return new Blob([raw], { type });
}
function saveBlob(blob, filename) {
	const url = URL.createObjectURL(blob);
	const anchor = document.createElement("a");
	anchor.href = url;
	anchor.download = filename;
	document.body.appendChild(anchor);
	anchor.click();
	anchor.remove();
	URL.revokeObjectURL(url);
}
async function exportQrFile(options, extension, filename) {
	const raw = await new (await (loadLib()))({
		...options,
		width: options.width,
		height: options.height,
		type: extension === "svg" ? "svg" : "canvas"
	}).getRawData(extension);
	if (!raw) throw new Error("Gagal mengekspor QR.");
	saveBlob(toBlob(raw, extension === "svg" ? "image/svg+xml" : "image/png"), filename);
}
async function copyQrPng(options) {
	const raw = await new (await (loadLib()))({
		...options,
		type: "canvas"
	}).getRawData("png");
	if (!raw) throw new Error("Gagal menyalin QR.");
	const blob = toBlob(raw, "image/png");
	if (!navigator.clipboard || !("ClipboardItem" in window)) throw new Error("Papan klip tidak tersedia di browser ini.");
	await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
}
var KEY = "arrizalgfx-qr-history";
var LIMIT = 8;
function loadHistory() {
	try {
		const raw = localStorage.getItem(KEY);
		if (!raw) return [];
		const parsed = JSON.parse(raw);
		if (!Array.isArray(parsed)) return [];
		return parsed.slice(0, LIMIT);
	} catch {
		return [];
	}
}
function saveHistory(items) {
	try {
		localStorage.setItem(KEY, JSON.stringify(items.slice(0, LIMIT)));
	} catch {}
}
function pushHistory(list, item) {
	const next = [item, ...list.filter((entry) => entry.data !== item.data)].slice(0, LIMIT);
	saveHistory(next);
	return next;
}
var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function trim(value) {
	return value.trim();
}
function escapeWifi(value) {
	return value.replace(/([\\;,:"])/g, "\\$1");
}
function digitsPhone(raw) {
	let value = raw.replace(/[^\d+]/g, "");
	if (value.startsWith("+")) value = value.slice(1);
	if (value.startsWith("0")) value = `62${value.slice(1)}`;
	return value;
}
function normalizeUrl(raw) {
	const value = trim(raw);
	if (!value) return "";
	if (/^https?:\/\//i.test(value)) return value;
	return `https://${value}`;
}
function isUrl(value) {
	try {
		const url = new URL(value);
		return url.protocol === "http:" || url.protocol === "https:";
	} catch {
		return false;
	}
}
function buildPayload(kind, fields) {
	switch (kind) {
		case "text": {
			const text = trim(fields.text);
			if (!text) return {
				ok: false,
				error: ""
			};
			return {
				ok: true,
				data: text,
				label: text
			};
		}
		case "url": {
			if (!trim(fields.url)) return {
				ok: false,
				error: ""
			};
			const url = normalizeUrl(fields.url);
			if (!url || !isUrl(url)) return {
				ok: false,
				error: "URL tidak valid."
			};
			return {
				ok: true,
				data: url,
				label: url
			};
		}
		case "whatsapp": {
			if (!trim(fields.waPhone)) return {
				ok: false,
				error: ""
			};
			const phone = digitsPhone(fields.waPhone);
			if (phone.length < 8) return {
				ok: false,
				error: "Nomor WhatsApp tidak valid."
			};
			const text = trim(fields.waText);
			return {
				ok: true,
				data: text ? `https://wa.me/${phone}?text=${encodeURIComponent(text)}` : `https://wa.me/${phone}`,
				label: `WA ${phone}`
			};
		}
		case "wifi": {
			const ssid = trim(fields.wifiSsid);
			if (!ssid) return {
				ok: false,
				error: ""
			};
			const enc = fields.wifiEnc || "WPA";
			const pass = fields.wifiPass;
			if (enc !== "nopass" && !trim(pass)) return {
				ok: false,
				error: "Kata sandi WiFi wajib diisi."
			};
			const hidden = fields.wifiHidden === "true";
			return {
				ok: true,
				data: `WIFI:T:${enc};S:${escapeWifi(ssid)};${enc === "nopass" ? "" : `P:${escapeWifi(pass)};`}H:${hidden};;`,
				label: `WiFi ${ssid}`
			};
		}
		case "email": {
			const to = trim(fields.emailTo);
			if (!to) return {
				ok: false,
				error: ""
			};
			if (!EMAIL_RE.test(to)) return {
				ok: false,
				error: "Alamat email tidak valid."
			};
			const params = new URLSearchParams();
			if (trim(fields.emailSubject)) params.set("subject", trim(fields.emailSubject));
			if (trim(fields.emailBody)) params.set("body", trim(fields.emailBody));
			const query = params.toString();
			return {
				ok: true,
				data: `mailto:${to}${query ? `?${query}` : ""}`,
				label: to
			};
		}
		case "phone": {
			const phone = trim(fields.phone);
			if (!phone) return {
				ok: false,
				error: ""
			};
			if (phone.replace(/\D/g, "").length < 6) return {
				ok: false,
				error: "Nomor telepon tidak valid."
			};
			return {
				ok: true,
				data: `tel:${phone.replace(/\s/g, "")}`,
				label: phone
			};
		}
		case "sms": {
			const phone = trim(fields.smsPhone);
			if (!phone) return {
				ok: false,
				error: ""
			};
			if (phone.replace(/\D/g, "").length < 6) return {
				ok: false,
				error: "Nomor SMS tidak valid."
			};
			const body = trim(fields.smsBody);
			return {
				ok: true,
				data: body ? `sms:${phone.replace(/\s/g, "")}?body=${encodeURIComponent(body)}` : `sms:${phone.replace(/\s/g, "")}`,
				label: phone
			};
		}
		case "vcard": {
			const name = trim(fields.vName);
			if (!name) return {
				ok: false,
				error: ""
			};
			const lines = [
				"BEGIN:VCARD",
				"VERSION:3.0",
				`FN:${name}`
			];
			if (trim(fields.vPhone)) lines.push(`TEL:${trim(fields.vPhone)}`);
			if (trim(fields.vEmail)) {
				if (!EMAIL_RE.test(trim(fields.vEmail))) return {
					ok: false,
					error: "Email vCard tidak valid."
				};
				lines.push(`EMAIL:${trim(fields.vEmail)}`);
			}
			if (trim(fields.vCompany)) lines.push(`ORG:${trim(fields.vCompany)}`);
			if (trim(fields.vUrl)) {
				const url = normalizeUrl(fields.vUrl);
				if (!isUrl(url)) return {
					ok: false,
					error: "Website vCard tidak valid."
				};
				lines.push(`URL:${url}`);
			}
			lines.push("END:VCARD");
			return {
				ok: true,
				data: lines.join("\n"),
				label: name
			};
		}
		case "location": {
			const lat = trim(fields.locLat);
			const lng = trim(fields.locLng);
			const address = trim(fields.locAddress);
			if (lat || lng) {
				const la = Number(lat);
				const ln = Number(lng);
				if (!Number.isFinite(la) || !Number.isFinite(ln)) return {
					ok: false,
					error: "Latitude / longitude tidak valid."
				};
				if (Math.abs(la) > 90 || Math.abs(ln) > 180) return {
					ok: false,
					error: "Koordinat di luar jangkauan."
				};
				return {
					ok: true,
					data: `geo:${la},${ln}`,
					label: `${la}, ${ln}`
				};
			}
			if (!address) return {
				ok: false,
				error: ""
			};
			return {
				ok: true,
				data: `geo:0,0?q=${encodeURIComponent(address)}`,
				label: address
			};
		}
		default: return {
			ok: false,
			error: "Jenis QR tidak dikenal."
		};
	}
}
function contrastWarning(fg, bg) {
	const a = luminance(fg);
	const b = luminance(bg);
	if (a === null || b === null) return null;
	if ((Math.max(a, b) + .05) / (Math.min(a, b) + .05) < 3) return "Kontras rendah — beberapa kamera mungkin gagal memindai.";
	return null;
}
function luminance(hex) {
	const match = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
	if (!match) return null;
	const n = Number.parseInt(match[1], 16);
	const r = srgb(n >> 16 & 255);
	const g = srgb(n >> 8 & 255);
	const bl = srgb(n & 255);
	return .2126 * r + .7152 * g + .0722 * bl;
}
function srgb(channel) {
	const c = channel / 255;
	return c <= .03928 ? c / 12.92 : ((c + .055) / 1.055) ** 2.4;
}
function toQrOptions(data, style, size = style.size) {
	const errorCorrectionLevel = style.logoDataUrl ? "H" : style.ecLevel;
	const gradient = style.useGradient ? {
		type: "linear",
		rotation: Math.PI / 4,
		colorStops: [{
			offset: 0,
			color: style.fg
		}, {
			offset: 1,
			color: style.gradientTo
		}]
	} : void 0;
	return {
		width: size,
		height: size,
		type: "canvas",
		data,
		margin: style.margin,
		image: style.logoDataUrl || void 0,
		qrOptions: {
			errorCorrectionLevel,
			mode: "Byte"
		},
		imageOptions: {
			hideBackgroundDots: style.hideBackgroundDots,
			imageSize: style.logoSize,
			margin: 6,
			crossOrigin: "anonymous"
		},
		dotsOptions: {
			type: style.dotType,
			color: style.fg,
			gradient
		},
		cornersSquareOptions: {
			type: style.cornerSquareType,
			color: style.useGradient ? style.gradientTo : style.fg
		},
		cornersDotOptions: {
			type: style.cornerDotType,
			color: style.fg
		},
		backgroundOptions: { color: style.bg }
	};
}
function exportSize(style) {
	return Math.max(1024, Math.round(style.size * 2));
}
function QrStudio() {
	const [kind, setKind] = (0, import_react.useState)("url");
	const [fields, setFields] = (0, import_react.useState)(EMPTY_FIELDS);
	const [style, setStyle] = (0, import_react.useState)(DEFAULT_STYLE);
	const [history, setHistory] = (0, import_react.useState)([]);
	const [theme, setTheme] = (0, import_react.useState)("dark");
	const [pulse, setPulse] = (0, import_react.useState)(false);
	const payload = (0, import_react.useMemo)(() => buildPayload(kind, fields), [kind, fields]);
	const warning = contrastWarning(style.fg, style.bg);
	const options = payload.ok ? toQrOptions(payload.data, style) : null;
	const encoded = payload.ok ? payload.data : "";
	const snapshotRef = (0, import_react.useRef)({
		payload,
		style,
		kind,
		fields
	});
	snapshotRef.current = {
		payload,
		style,
		kind,
		fields
	};
	(0, import_react.useEffect)(() => {
		setHistory(loadHistory());
		try {
			const saved = localStorage.getItem("arrizal-theme");
			if (saved === "light" || saved === "dark") setTheme(saved);
		} catch {}
	}, []);
	(0, import_react.useEffect)(() => {
		document.documentElement.classList.toggle("dark", theme === "dark");
		try {
			localStorage.setItem("arrizal-theme", theme);
		} catch {}
	}, [theme]);
	(0, import_react.useEffect)(() => {
		recordVisit().catch(() => {});
	}, []);
	const patchFields = (patch) => setFields((current) => ({
		...current,
		...patch
	}));
	const patchStyle = (patch) => setStyle((current) => ({
		...current,
		...patch
	}));
	const remember = (0, import_react.useCallback)(() => {
		const snap = snapshotRef.current;
		if (!snap.payload.ok) return false;
		const item = {
			id: crypto.randomUUID(),
			kind: snap.kind,
			label: snap.payload.label,
			data: snap.payload.data,
			fields: snap.fields,
			style: { ...snap.style },
			createdAt: Date.now()
		};
		setHistory((list) => pushHistory(list, item));
		return true;
	}, []);
	const download = (0, import_react.useCallback)(async (extension) => {
		const snap = snapshotRef.current;
		if (!snap.payload.ok) {
			toast.error(snap.payload.error || "Isi data terlebih dahulu.");
			return;
		}
		try {
			const size = exportSize(snap.style);
			await exportQrFile(toQrOptions(snap.payload.data, snap.style, size), extension, `qr-arrizalgfx-${Date.now()}.${extension}`);
			remember();
			toast.success(extension === "png" ? "PNG diunduh" : "SVG diunduh");
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Gagal mengunduh");
		}
	}, [remember]);
	(0, import_react.useEffect)(() => {
		function onKey(event) {
			if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
				event.preventDefault();
				download("png");
			}
		}
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [download]);
	async function handleCopy() {
		const snap = snapshotRef.current;
		if (!snap.payload.ok) {
			toast.error(snap.payload.error || "Isi data terlebih dahulu.");
			return;
		}
		try {
			const size = exportSize(snap.style);
			await copyQrPng(toQrOptions(snap.payload.data, snap.style, size));
			remember();
			toast.success("Disalin ke papan klip");
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Gagal menyalin");
		}
	}
	function handleCreate() {
		if (!payload.ok) {
			toast.error(payload.error || "Isi data terlebih dahulu.");
			return;
		}
		remember();
		setPulse(true);
		window.setTimeout(() => setPulse(false), 280);
		toast.success("QR siap");
	}
	function handleReset() {
		setKind("url");
		setFields(EMPTY_FIELDS);
		setStyle(DEFAULT_STYLE);
		toast.message("Direset ke default");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
				theme,
				position: "top-center",
				richColors: false
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-30 border-b border-border bg-panel backdrop-blur-md",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 text-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandMark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-base font-semibold tracking-tight",
							children: "QR Code Generator"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "by ArrizalGFX"
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "ghost",
								size: "icon",
								onClick: handleReset,
								"aria-label": "Reset",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "ghost",
								size: "icon",
								"aria-label": "Tema",
								onClick: () => setTheme((current) => current === "dark" ? "light" : "dark"),
								children: theme === "dark" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, {})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto grid w-full max-w-6xl flex-1 grid-cols-1 gap-5 px-4 py-6 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-start",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "order-1 lg:order-2 lg:sticky lg:top-20",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `rounded-2xl bg-card p-4 text-card-foreground shadow-[var(--shadow-border)] transition-transform duration-200 ${pulse ? "scale-[1.02]" : "scale-100"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mx-auto max-w-[200px] lg:max-w-none",
								children: options ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "overflow-hidden rounded-xl bg-white p-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrLive, { options })
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex aspect-square items-center justify-center rounded-xl border border-dashed border-border bg-muted/40 px-6 text-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted-foreground",
										children: "Isi data di kiri"
									})
								})
							}),
							warning ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-xs text-destructive",
								children: warning
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 grid grid-cols-2 gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										onClick: handleCreate,
										className: "col-span-2",
										children: "Buat QR"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										type: "button",
										variant: "outline",
										onClick: () => void download("png"),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {}), "Unduh PNG"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										type: "button",
										variant: "outline",
										onClick: () => void download("svg"),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {}), "Unduh SVG"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										type: "button",
										variant: "secondary",
										className: "col-span-2",
										onClick: () => void handleCopy(),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {}), "Salin"]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 space-y-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] font-medium uppercase tracking-wider text-muted-foreground",
										children: "Encoded content"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
										className: "max-h-24 overflow-auto rounded-lg bg-muted px-3 py-2 font-mono text-[11px] leading-relaxed break-all text-muted-foreground",
										children: encoded || "—"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: "Uji pindaian dengan kamera HP sebelum dicetak atau dibagikan. Ctrl/Cmd + Enter untuk unduh PNG."
									})
								]
							})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "order-2 space-y-5 lg:order-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
							title: "Konten",
							description: "Pilih jenis, lalu isi data yang akan di-encode.",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TypePicker, {
										value: kind,
										onChange: setKind
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContentForm, {
										kind,
										fields,
										onChange: patchFields
									}),
									!payload.ok && payload.error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-destructive",
										children: payload.error
									}) : null
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
							title: "Tampilan",
							description: "Warna, bentuk, logo, dan koreksi error.",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StyleForm, {
								style,
								onChange: patchStyle
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
							title: "Riwayat",
							description: "8 QR terakhir tersimpan di perangkat ini.",
							action: history.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-mono text-xs tabular-nums text-muted-foreground",
								children: [history.length, "/8"]
							}) : null,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HistoryList, {
								items: history,
								onRestore: (item) => {
									setKind(item.kind);
									setFields(item.fields);
									setStyle({
										...DEFAULT_STYLE,
										...item.style
									});
								},
								onClear: () => {
									setHistory([]);
									saveHistory([]);
								}
							})
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "mt-auto border-t border-border px-4 py-5 text-center text-xs text-muted-foreground",
				children: ["Crafted by ArrizalGFX · ", (/* @__PURE__ */ new Date()).getFullYear()]
			})
		]
	});
}
//#endregion
export { QrStudio };
