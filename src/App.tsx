import { useEffect, useRef, useState } from "react";
import MainLayout from "./layouts/main";
import { useParams } from "./hooks/useParams";
import { DateTime } from "luxon";
import useMenuStore from "./state/menu";
import { AnimatePresence, Variants, motion } from "framer-motion";
import SlideComp, { Direction } from "./components/slide-comp";

function App() {
  const { activeMenu } = useMenuStore();
  const [opened, setOpened] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current && opened) {
      audioRef.current.volume = 0.65;
      audioRef.current.play();
    }
  }, [opened]);
  return (
    <>
      <audio src="/lagu.mp3" autoPlay={true} ref={audioRef} loop={true} />
      <Cover opened={opened} setOpened={setOpened} />

      {opened && (
        <AnimatePresence>
          <MainLayout>
            <div className="">
              {/* waktu */}
              {activeMenu === 0 && <Schedule />}
              {/* end waktu */}
              {/* rundown */}
              {activeMenu === 1 && <Maps />}
              {/* end rundown */}
              {/* maps */}
              {activeMenu === 2 && <RundownComp />}
              {/* end maps */}
              {/* rules */}
              {activeMenu === 3 && <Rules />}
              {/* end rules */}
              {/* closing */}
              {activeMenu === 4 && <Closing />}
              {/* end closing */}
            </div>
          </MainLayout>
        </AnimatePresence>
      )}
    </>
  );
}

export const variants: Variants = {
  hidden: {
    y: "-100vh",
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transitionDuration: "500ms",
  },
};

type CoverProps = {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

function Cover(props: CoverProps) {
  const param = useParams("to");

  const handleOpen = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    props.setOpened(true);
    // alert("ok");
  };

  return (
    <>
      <AnimatePresence>
        {!props.opened && (
          <motion.div
            variants={variants}
            initial="visible"
            animate="visible"
            exit="hidden"
          >
            <div className="font-mulish bg-[url(/img/background.jpeg)] bg-center bg-cover relative md:m-auto w-screen overflow-hidden md:w-[640px] h-screen bg-[#f9f9fb] flex flex-col justify-center items-center">
              {/*<div className="absolute top-0 left-0 w-full">*/}
              {/*  <img src="/img/bg_ornamen_top.png" alt="ornamen-top" />*/}
              {/*</div>*/}

              <div className="w-20 absolute top-10 left-10">
                <img
                  src="/img/Logo_ALBA.png"
                  alt="logo"
                  className="w-full h-full"
                />
              </div>
              <div className="w-20 absolute top-10 right-10">
                <img
                  src="/img/Logo_YAIM.png"
                  alt="logo"
                  className="w-full h-full"
                />
              </div>
              <div className="flex flex-col justify-center items-center gap-6 z-50">
                <SlideComp direction={Direction.Down} className="w-full">
                  <p className="text-4xl mb-4 mx-auto font-cormorant-garamond text-center font-medium text-black w-2/3 justify-self-center">
                    TASYAKUR KELULUSAN
                  </p>
                </SlideComp>

                <SlideComp
                  direction={Direction.Down}
                  className="text-center text-black"
                >
                  <p className="">ANGKATAN XXV</p>
                  <p className="">SMP ISLAM AL-AZHAR 10 KEMBANGAN</p>
                  <p className="text-xs">Tahun Ajaran 2025/2026</p>
                </SlideComp>
                <div className="w-7/12">
                  {param && (
                    <SlideComp
                      className="w-full h-full flex flex-col gap-1"
                      direction={Direction.Up}
                    >
                      <div className="">
                        <p className="text-xs text-gray-600/80">Kepada Yth:</p>
                      </div>
                      <div className="text-xl w-full h-24 flex justify-center items-center rounded-md bg-gray-500/60 opacity-60 text-black font-serif">
                        <p>{param}</p>
                      </div>
                    </SlideComp>
                  )}
                </div>
                <SlideComp direction={Direction.Up}>
                  <button
                    onClick={handleOpen}
                    className="py-4 px-8 bg-gradient-to-t from-amber-600 to-amber-300 text-black rounded shadow font-semibold"
                  >
                    Buka
                  </button>
                </SlideComp>
              </div>
              <div className="w-24 absolute bottom-32 right-1/2 translate-x-1/2 translate-y-1/2">
                <img
                  src="/img/logo_angkatan.jpeg"
                  alt="logo"
                  className="w-full h-full"
                />
              </div>
              {/*<div className="absolute bottom-0 left-0 w-full z-10">*/}
              {/*  <img src="/img/bg_ornamen_bot.png" alt="ornamen-bot" />*/}
              {/*</div>*/}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Schedule() {
  const [hari, setHari] = useState(0);
  const [jam, setJam] = useState(0);
  const [menit, setMenit] = useState(0);
  const [detik, setDetik] = useState(0);
  const guru = useParams("guru") as boolean | null;

  const timer = () => {
    const countDate = DateTime.fromFormat(
      "June 06 2026 07:00:00",
      "LLLL dd yyyy HH:mm:ss",
      {
        zone: "Asia/Jakarta",
      }
    ).valueOf();
    const now = DateTime.now().setZone("Asia/Jakarta").valueOf();
    const gap = countDate - now;

    const detik = 1000;
    const menit = detik * 60;
    const jam = menit * 60;
    const hari = jam * 24;

    setHari(Math.floor(gap / hari));
    setJam(Math.floor((gap % hari) / jam));
    setMenit(Math.floor((gap % jam) / menit));
    setDetik(Math.floor((gap % menit) / detik));
  };

  setInterval(() => timer(), 1000);
  return (
    <div className="text-black flex flex-col items-center gap-16">
      {/*  */}
      <SlideComp
        direction={Direction.Down}
        className="w-10/12 flex items-center justify-between bg-gradient-to-t from-amber-600 to-amber-300 rounded-lg"
      >
        <div className="p-2 flex items-center justify-center flex-col">
          <p className="text-3xl text-center font-medium text-black">
            {hari}
          </p>
          <p>Hari</p>
        </div>
        <div className="p-2 flex items-center justify-center flex-col">
          <p className="text-3xl text-center font-medium">{jam}</p>
          <p>Jam</p>
        </div>
        <div className="p-2 flex items-center justify-center flex-col">
          <p className="text-3xl text-center font-medium">{menit}</p>
          <p>Menit</p>
        </div>
        <div className="p-2 flex items-center justify-center flex-col">
          <p className="text-3xl text-center font-medium">{detik}</p>
          <p>Detik</p>
        </div>
      </SlideComp>
      {/*  */}
      <SlideComp className="">
        <div className="flex gap-8 items-center text-center">
          <div className="w-20">
            <div>
              <p>Sabtu</p>
            </div>
          </div>
          <div className=" border-x-2 px-6 border-black">
            <div className="">
              <div>
                <p className="font-semibold text-5xl">06</p>
              </div>
            </div>
            <div className="">
              <div>
                <p>2026</p>
              </div>
            </div>
          </div>
          <div className="w-20">
            <div>
              <p>Juni</p>
            </div>
          </div>
        </div>
      </SlideComp>
      {/*  */}
      {!guru && (
        <SlideComp direction={Direction.Up} className="text-sm text-center">
          <p>Dresscode murid:</p>
          <p>Putri: Kebaya Seragam</p>
          <p>Putra: Jas Hitam, Kemeja Putih, Dasi Seragam, Sepatu Pantofel</p>
        </SlideComp>
      )}
      {/*{guru && (*/}
      {/*  <SlideComp direction={Direction.Up} className="text-sm text-center">*/}
      {/*    <p>Dresscode Guru:</p>*/}
      {/*    <p>Prempuan: Baju Seragam Lilac, Kerudung Seragam</p>*/}
      {/*    <p>Laki-laki: Batik Seragam, Celana Hitam, Peci Hitam</p>*/}
      {/*  </SlideComp>*/}
      {/*)}*/}
    </div>
  );
}

const runDownArr = [
  {
    title: "Parade Guru dan Murid",
    time: "07.10 - 07.20",
  },
  {
    title: "Pembukaan",
    time: "07.20 - 07.25",
  },
  {
    title: "Ikrar",
    time: "07.25 - 07.30",
  },
  {
    title: "Pembacaan Ayat suci Al-Qur’an",
    time: "07.30 - 07.35",
  },
  {
    title: ["Menyanyikan lagu Indonesia Raya", "Menyanyikan Mars Al Azhar"],
    time: "07.35 - 07.45",
  },
  {
    title: "Doa",
    time: "07.45 - 07.50",
  },
  {
    title: "Sambutan Kepala Sekolah dan pengumuman kelulusan dan prestasi sekolah",
    time: "07.50 - 08.00",
  },
  {
    title: "Prosesi dan pengalungan medali kelulusan",
    time: "08.00 - 09.35",
  },
  {
    title: ["Sambutan-Sambutan",
        "Perwakilan murid kelas IX SMP",
        "Perwakilan pengurus OSIS",
        "Ketua Jamiyyah SMPI Al Azhar 10 Kembangan",
        "Perwakilan Kepala SMPIA 10 periode …",
        "Ketua Yayasan Al Ikhwan Meruya",
        "Pengawas Pendidikan Jakarta Barat 2",
        "Kepala Diratdikdasmen YPI Al Azhar",
        "Kepala Dinas Pendidikan Provinsi DKI Jakarta"
    ],
    time: "09.35 - 10.05",
  },
  {
    title: ["Pengukuhan anggota Alumni Sekolah Islam Al Azhar", "Janji alumni", "Serah terima alumni SMPI Al Azhar 10 kepada ASIA Kampus al azhar Kembangan"],
    time: "10.05 - 10.15",
  },
  {
    title: "Penyerahan secara simbolis dari pihak sekolah kepada orang tua murid",
    time: "10.15 - 10.20",
  },
  {
    title: "Sambutan Perwakilan Orang tua Murid Kelas IX Angkatan 25 tahun 2025/2026",
    time: "10.20 - 10.25",
  },
  {
    title: ["Penampilan", "Tari Kreasi", "Penampilan alumni alba angkatan 25"],
    time: "10.25 - 10.50",
  },
  {
    title: "Informasi para sponsor",
    time: "10.50 - 10.55",
  },
  {
    title: "Pengumuman penghargaan prestasi keagamaan, akademik, dan non akademik murid kelas IX angkatan 25 tahun Ajaran 2025/2026",
    time: "10.55 - 11.20",
  },
  {
    title: "Pemutaran video kilas balik",
    time: "11.20 - 11.30",
  },
  {
    title: "Persembahan untuk orang tua (Menyanyikan sebuah lagu)",
    time: "11.30 - 11.45",
  },
  {
    title: ["Penutup", "Foto Bersama"],
    time: "11.45 - 12.00",
  },
];

function RundownComp() {
  return (
    <div className="w-10/12 md:w-7/12 m-auto text-black">
      <div className="mb-6">
        <p className="text-2xl text-center font-semibold">Jadwal Acara</p>
      </div>
      <div className="relative col-span-12 px-6 space-y-6 w-full h-[60vh] overflow-scroll">
        {runDownArr.map((rundown) => {
          return (
            <div
              key={rundown.time}
              className="w-fit col-span-12 space-y-12 relative px-6 before:absolute before:top-4 before:-bottom-10 before:w-0.5 before:-left-3 before:dark:bg-amber-900"
            >
              <div className="flex flex-col relative before:absolute before:top-2 before:w-4 before:h-4 before:rounded-full before:left-[-43px] before:z-[1] before:bg-amber-900 w-fit">
                {typeof rundown.title === "object" ? (
                  <SlideComp
                    direction={Direction.Right}
                    className="flex flex-col gap-4"
                  >
                    {rundown.title.map((rundownTitle) => {
                      return (
                        <h3
                          key={rundownTitle}
                          className="text-lg font-semibold tracking-wide w-fit"
                        >
                          <p>{rundownTitle}</p>
                        </h3>
                      );
                    })}
                  </SlideComp>
                ) : (
                  <SlideComp direction={Direction.Right}>
                    <h3 className="text-lg font-semibold tracking-wide w-fit">
                      <p>{rundown.title}</p>
                    </h3>
                  </SlideComp>
                )}
                <time className="text-xs tracking-wide uppercase w-fit">
                  <SlideComp direction={Direction.Right}>
                    <p>{rundown.time}</p>
                  </SlideComp>
                </time>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Maps() {
  return (
    <div className="w-full flex flex-col items-center gap-6">
      <SlideComp direction={Direction.Down} className="">
        <p className="text-2xl text-center font-semibold text-black">
          Maps
        </p>
      </SlideComp>
      <SlideComp direction={Direction.Down} className="w-10/12">
        <p className="text-sm text-center">
          Gedung CNI, Puri Kembangan, Jakarta Barat
        </p>
      </SlideComp>
      {/*  */}
      <SlideComp
        direction={Direction.Up}
        className="w-10/12 h-full border-2 border-violet-900 rounded-lg overflow-hidden"
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4186.048250714134!2d106.73777694112576!3d-6.191248295157963!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f76b97172075%3A0x21fd5e11191f9839!2sCNI!5e0!3m2!1sen!2sid!4v1779854831316!5m2!1sen!2sid"
          width={350}
          height={350}
          // className="w-[80vw] h-full"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </SlideComp>
      {/*  */}
      <SlideComp direction={Direction.Up} className="">
        <a
          className="p-3 rounded bg-gradient-to-t from-amber-600 to-amber-300 shadow"
          // href="https://goo.gl/maps/JTubxLm8Fcjesq5Q6"
          onClick={() =>
            window.open(
              "https://maps.app.goo.gl/3Z4d5FBh9TRFjGBGA",
              // "https://goo.gl/maps/gGC6ZKKTNWfLTzsh7",
              "_blank",
              "noopener,noreferrer"
            )
          }
        >
          Buka di Google Maps
        </a>
      </SlideComp>
    </div>
  );
}

function Rules() {
  return (
    <div className="w-10/12 m-auto text-black">
      <SlideComp direction={Direction.Down} className="mb-6">
        <p className="text-2xl text-center font-semibold">Tata Tertib</p>
      </SlideComp>
      <SlideComp direction={Direction.Up}>
        <ul className="list-disc list-inside space-y-2 text-sm">
          <li>Hadir 30 menit sebelum acara dimulai</li>
          <li>Undangan hanya untuk tiga orang yaitu murid dan orang tua dengan menempati posisi duduk sesuai tempat yang telah ditentukan.</li>
          <li>Berpakaian rapi, sopan, atau berbusana muslimah</li>
          <li>Murid kelas IX mengenakan seragam yang sudah ditentukan</li>
          <li>Murid kelas IX tidak diperkenankan membawa ponsel selama acara berlangsung</li>
          <li>Ubah pengaturan ponsel menjadi mode hening sebelum acara dimulai</li>
          <li>Tidak diperkenankan memotret ke depan pelataran panggung selama acara berlangsung</li>
          <li>Menjaga barang-barang pribadi dan tidak menitipkan kepada orang lain</li>
          <li>Mengikuti seluruh rangkaian acara dengan khidmat hingga selesai</li>
          <li>Sesi foto murid bersama orang tua dapat dilaksanakan sebelum acara dimulai atau setelah acara selesai</li>
        </ul>
      </SlideComp>
    </div>
  )
}

function Closing() {
  return (
    <div className="text-black flex justify-center w-full">
      <SlideComp direction={Direction.Down} className="w-10/12">
        <p className="text-center leading-8 font-semibold text-xl ">
          Ya Allah, jadikanlah ilmu yang Engkau ajarkan kepada kami bermanfaat. Ajarkanlah kepada kami ilmu yang bermanfaat, dan tambahkanlah ilmu kepada kami.
        </p>
      </SlideComp>
    </div>
  );
}

export default App;
