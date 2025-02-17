import { Stack, Box, Typography } from "@mui/material";

const BizHaqimizda = () => {
  return (
    <Stack
      id={"bizHaqimizda"}
      maxWidth={"1366px"}
      width={"100%"}
      margin={"auto"}
      py={5}
      minHeight={"calc(768px - 80px)"}
    >
      <Stack
        py={5}
        gap={4}
        direction={{
          xs: "column",
          lg: "row",
        }}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Box
          width={{
            xs: "90%",
            lg: "50%",
          }}
        >
          <div>
            <iframe
              width="100%"
              height="400px"
              style={{ borderRadius: "1rem" }}
              src="https://www.youtube.com/embed/-qTlzRCqv4s?si=g2ylp_yF8szH9D8B"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          </div>
        </Box>
        <Box
          width={{
            xs: "90%",
            lg: "50%",
          }}
          sx={{
            flexDirection: "column",
            gap: 2,
            p: 2,
          }}
        >
          <Typography
            variant="h3"
            fontWeight={600}
            textAlign={"center"}
            pb={3}
            sx={{
              color: "#013894",
              fontSize: {
                xs: "2rem",
                sm: "2.5rem",
                md: "3rem",
                lg: "3.5rem",
                xl: "4rem",
              },
            }}
          >
            Biz haqimizda
          </Typography>
          <Typography variant="body1" sx={{ textAlign: "justify" }}>
            Silver water kompaniyasiga 1995-yilda asos solingan bo‘lib,
            O‘zbekistonda birinchilardan bo‘lib gazlangan va gazlanmagan
            ichimlik suvini xalqimizga taqdim etib kelmoqda. Yillar davomida biz
            mijozlarning tabiiy toza suvga bo'lgan ehtiyojlarini doimiy qondirib
            kelmoqdamiz. Bizning kompaniya nafaqat ishlab chiqaruvchi balki,
            qisqa muddatlarda yetkazib beruvchi ham bo'lganligi sababli, toza
            hamda sifatli suv bilan ta'minlashda ishonchli hamkoringiz bo'la
            olishimizga ishonchimiz komil. Biz savdo nuqtalari, biznes va uy
            uchun suvlarimizni siz qadrli mijozlarimizga taqdim etishdan
            mamnunmiz.
          </Typography>
          <Typography variant="body1" sx={{ textAlign: "justify" }}>
            Bizning vazifamiz – sifatlii ichimlik suvini hamma uchun oson va
            qulay narxlarda ta’minlashdir. Biz mijozlarimizga optimal yechimni
            tanlash bo'yicha takliflarni o'z ichiga olgan keng turdagi
            mahsulotlarimizni va xizmatlarimizni taklif etamiz.
          </Typography>
          <Typography variant="body1" sx={{ textAlign: "justify" }}>
            Bizga qo'shiling va suvingiz sifatiga g'amxo'rlik qilishni bizga
            ishonib topshiring – birgalikda kundalik hayotingizni toza, sog'lom
            va qulayroq qilamiz.
          </Typography>
        </Box>
      </Stack>
    </Stack>
  );
};

export default BizHaqimizda;
