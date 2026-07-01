export interface WeddingPhoto {
  id: string;
  filename: string;
  src: string;
  alt: string;
  width: number;
  height: number;
}

const IMAGEKIT_BASE =
  "https://ik.imagekit.io/coznkyihe/filtred_collection_edited";

const PHOTO_FILES = [
  "IMG_7360_ay7VqnMkEY.jpeg",
  "IMG_7359_YZiSed6Tt.jpeg",
  "IMG_7368_znryXhuh4.jpeg",
  "IMG_7363_nUqWv2DUv.jpeg",
  "IMG_7379_guFiWKYLf.jpeg",
  "IMG_7369_t5Oo9wkiG.jpeg",
  "IMG_7371_XpoSNLT7k.jpeg",
  "IMG_7372_RHlF0pTbf.jpeg",
  "IMG_7445_BBB0RUtxF.jpeg",
  "IMG_7248_W7hgXBy6l.jpeg",
  "IMG_7533_FTBOLvLsC3.jpeg",
  "IMG_7249_5VdT5Nrdw.jpeg",
  "IMG_7559_7uKadSF9d.jpeg",
  "IMG_7568_9cYf9qzw9B.jpeg",
  "IMG_7385_IxIh8_hz_.jpeg",
  "IMG_7544_vQ1LoNs_C.jpeg",
  "IMG_7244_DSOLk7OzPu.jpeg",
  "IMG_7413_Y3As3rf8q.jpeg",
  "IMG_7600_T-Gt2c4t_.jpeg",
  "IMG_7394_Ge7-TL8FB.jpeg",
  "IMG_7400_JiUh9uLtqs.jpeg",
  "IMG_7550_rMYkas66w.jpeg",
  "IMG_7552_vDth68tgD.jpeg",
  "IMG_7416_Rj9vHZGIZ.jpeg",
  "IMG_7399_6Dol-ivk_.jpeg",
  "IMG_7536_nm7ScW0-9.jpeg",
  "IMG_7427_u_fx6I6p7z.jpeg",
  "IMG_7388_rOMI6MlbX.jpeg",
  "IMG_7430_IFZKIueua.jpeg",
  "IMG_7598_QQEeec4V4.jpeg",
  "IMG_7407_s839uopR2.jpeg",
  "IMG_7410_YEhSKcUX6.jpeg",
  "IMG_7350_bocCNLvBGn.jpeg",
  "IMG_7518_mV97mKXIV.jpeg",
  "IMG_7515_mTIH03_Bc.jpeg",
  "IMG_7461_CUkcXSfGY.jpeg",
  "IMG_7254_wfBI54jSq.jpeg",
  "IMG_7456_3YNbIf1Q5.jpeg",
  "IMG_7468_caNjrIq8e.jpeg",
  "IMG_7219_3HdeyfaTc.jpeg",
  "IMG_7383_uBaOz4U8nw.jpeg",
  "IMG_7569_gZit88jkJm.jpeg",
  "IMG_7349_zlulwi_K_.jpeg",
  "IMG_7306_j7H6g_Z-VZ.jpeg",
  "IMG_7422_r49iR1YwU.jpeg",
  "IMG_7423_Q03nm3qns.jpeg",
  "IMG_7572_957GZFavC.jpeg",
  "IMG_7592_zYEjfzoFG.jpeg",
  "IMG_7250_uHQXMPu2x.jpeg",
  "IMG_7511_mzc7EPwA7s.jpeg",
  "IMG_7255_q95fkvMZh.jpeg",
  "IMG_7588_4ghlycfdV.jpeg",
  "IMG_7508_5-ceF7AKK.jpeg",
  "IMG_7015_b598Ux-PK.jpeg",
  "IMG_7440_La-TA7Jfah.jpeg",
  "IMG_7314_is8wfvhIX9.jpeg",
  "IMG_7424_toRtmPQED.jpeg",
  "IMG_7252_vAfftzsoRr.jpeg",
  "IMG_7301_l_TXKn3_Sx.jpeg",
  "IMG_7454_ocuJHxDpEJ.jpeg",
  "IMG_7029_auzkRP7z6.jpeg",
  "IMG_7217_T_TS7yxuz.jpeg",
] as const;

const ASPECT_VARIANTS = [
  { width: 1600, height: 2400 },
  { width: 2400, height: 1600 },
  { width: 1800, height: 1800 },
  { width: 1200, height: 1800 },
  { width: 2000, height: 1333 },
] as const;

function buildPhoto(filename: string, index: number): WeddingPhoto {
  const aspect = ASPECT_VARIANTS[index % ASPECT_VARIANTS.length];
  const id = filename.replace(/\.jpeg$/i, "");

  return {
    id,
    filename,
    src: `${IMAGEKIT_BASE}/${filename}`,
    alt: `Hüseyin & Yousra wedding — ${id}`,
    width: aspect.width,
    height: aspect.height,
  };
}

export const WEDDING_PHOTOS: WeddingPhoto[] = PHOTO_FILES.map(buildPhoto);

export const COLLAGE_PHOTOS = WEDDING_PHOTOS;

export const GALLERY_PHOTOS = WEDDING_PHOTOS;
