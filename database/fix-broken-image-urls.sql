-- Fix broken Cloudinary image URLs in the database
-- This script updates existing cloudinary_images records with correct URLs

-- Update Photography images with correct URLs
UPDATE cloudinary_images 
SET url = 'https://res.cloudinary.com/dkdvqimxe/image/upload/v1738286375/vic_falls_bridge_kuvefc.jpg',
    updated_at = CURRENT_TIMESTAMP
WHERE public_id = 'vic_falls_bridge_kuvefc';

UPDATE cloudinary_images 
SET url = 'https://res.cloudinary.com/dkdvqimxe/image/upload/v1738286375/_MG_0072_bvcbf7.jpg',
    updated_at = CURRENT_TIMESTAMP
WHERE public_id = '_MG_0072_bvcbf7';

UPDATE cloudinary_images 
SET url = 'https://res.cloudinary.com/dkdvqimxe/image/upload/v1738286375/DSC_2297_ey0tap.jpg',
    updated_at = CURRENT_TIMESTAMP
WHERE public_id = 'DSC_2297_ey0tap';

UPDATE cloudinary_images 
SET url = 'https://res.cloudinary.com/dkdvqimxe/image/upload/v1738286375/DSC_2475_qm0ifg.jpg',
    updated_at = CURRENT_TIMESTAMP
WHERE public_id = 'DSC_2475_qm0ifg';

UPDATE cloudinary_images 
SET url = 'https://res.cloudinary.com/dkdvqimxe/image/upload/v1738286375/IMG_5509_p9s3ww.jpg',
    updated_at = CURRENT_TIMESTAMP
WHERE public_id = 'IMG_5509_p9s3ww';

UPDATE cloudinary_images 
SET url = 'https://res.cloudinary.com/dkdvqimxe/image/upload/v1738286375/IMG_16221_bkwrjn.jpg',
    updated_at = CURRENT_TIMESTAMP
WHERE public_id = 'IMG_16221_bkwrjn';

UPDATE cloudinary_images 
SET url = 'https://res.cloudinary.com/dkdvqimxe/image/upload/v1738286375/DSC_0477_lzvqi1.jpg',
    updated_at = CURRENT_TIMESTAMP
WHERE public_id = 'DSC_0477_lzvqi1';

UPDATE cloudinary_images 
SET url = 'https://res.cloudinary.com/dkdvqimxe/image/upload/v1738286375/IMG_20190921_104822_79_qkzqdq.jpg',
    updated_at = CURRENT_TIMESTAMP
WHERE public_id = 'IMG_20190921_104822_79_qkzqdq';

-- Update Events images with correct URLs
UPDATE cloudinary_images 
SET url = 'https://res.cloudinary.com/dkdvqimxe/image/upload/v1738286375/IMG_3980_ypzjnl.jpg',
    updated_at = CURRENT_TIMESTAMP
WHERE public_id = 'IMG_3980_ypzjnl';

UPDATE cloudinary_images 
SET url = 'https://res.cloudinary.com/dkdvqimxe/image/upload/v1738286375/IMG_0615_afemi4.jpg',
    updated_at = CURRENT_TIMESTAMP
WHERE public_id = 'IMG_0615_afemi4';

UPDATE cloudinary_images 
SET url = 'https://res.cloudinary.com/dkdvqimxe/image/upload/v1738286375/IMG_20190921_104822_1_xp9y8y.jpg',
    updated_at = CURRENT_TIMESTAMP
WHERE public_id = 'IMG_20190921_104822_1_xp9y8y';

UPDATE cloudinary_images 
SET url = 'https://res.cloudinary.com/dkdvqimxe/image/upload/v1738286375/IMG_20190921_104822_2_wkzq2r.jpg',
    updated_at = CURRENT_TIMESTAMP
WHERE public_id = 'IMG_20190921_104822_2_wkzq2r';

UPDATE cloudinary_images 
SET url = 'https://res.cloudinary.com/dkdvqimxe/image/upload/v1738286375/IMG_20190921_104822_3_rkzq8s.jpg',
    updated_at = CURRENT_TIMESTAMP
WHERE public_id = 'IMG_20190921_104822_3_rkzq8s';

UPDATE cloudinary_images 
SET url = 'https://res.cloudinary.com/dkdvqimxe/image/upload/v1738286375/IMG_20190921_104822_4_tkzq9t.jpg',
    updated_at = CURRENT_TIMESTAMP
WHERE public_id = 'IMG_20190921_104822_4_tkzq9t';

-- Update Video images with correct URLs
UPDATE cloudinary_images 
SET url = 'https://res.cloudinary.com/dkdvqimxe/image/upload/v1738286375/DSC_8600_cxuh5l.jpg',
    updated_at = CURRENT_TIMESTAMP
WHERE public_id = 'DSC_8600_cxuh5l';

UPDATE cloudinary_images 
SET url = 'https://res.cloudinary.com/dkdvqimxe/image/upload/v1738286375/IMG_4074_rnrnpx.jpg',
    updated_at = CURRENT_TIMESTAMP
WHERE public_id = 'IMG_4074_rnrnpx';

UPDATE cloudinary_images 
SET url = 'https://res.cloudinary.com/dkdvqimxe/image/upload/v1738286375/IMG_20190921_104822_5_ukzqau.jpg',
    updated_at = CURRENT_TIMESTAMP
WHERE public_id = 'IMG_20190921_104822_5_ukzqau';

-- Update Creative images with correct URLs
UPDATE cloudinary_images 
SET url = 'https://res.cloudinary.com/dkdvqimxe/image/upload/v1738286375/DSC_2591_zkfd8a.jpg',
    updated_at = CURRENT_TIMESTAMP
WHERE public_id = 'DSC_2591_zkfd8a';

UPDATE cloudinary_images 
SET url = 'https://res.cloudinary.com/dkdvqimxe/image/upload/v1738286375/untitled-455_gkodql.jpg',
    updated_at = CURRENT_TIMESTAMP
WHERE public_id = 'untitled-455_gkodql';

UPDATE cloudinary_images 
SET url = 'https://res.cloudinary.com/dkdvqimxe/image/upload/v1738286375/IMG_20190921_104822_6_vkzqgv.jpg',
    updated_at = CURRENT_TIMESTAMP
WHERE public_id = 'IMG_20190921_104822_6_vkzqgv';

-- Update Other images with correct URLs
UPDATE cloudinary_images 
SET url = 'https://res.cloudinary.com/dkdvqimxe/image/upload/v1738286375/IMG_20190921_104822_76_nkzqdn.jpg',
    updated_at = CURRENT_TIMESTAMP
WHERE public_id = 'IMG_20190921_104822_76_nkzqdn';

UPDATE cloudinary_images 
SET url = 'https://res.cloudinary.com/dkdvqimxe/image/upload/v1738286375/IMG_20190921_104822_77_okzqdo.jpg',
    updated_at = CURRENT_TIMESTAMP
WHERE public_id = 'IMG_20190921_104822_77_okzqdo';

UPDATE cloudinary_images 
SET url = 'https://res.cloudinary.com/dkdvqimxe/image/upload/v1738286375/IMG_20190921_104822_78_pkzqdp.jpg',
    updated_at = CURRENT_TIMESTAMP
WHERE public_id = 'IMG_20190921_104822_78_pkzqdp';

-- Verify the updates
SELECT 
    public_id,
    old_url::text as old_url,
    new_url::text as new_url,
    category,
    updated_at
FROM (
    SELECT 
        ci.public_id,
        ci.url as old_url,
        ci.category,
        ci.updated_at
    FROM cloudinary_images ci
    WHERE ci.public_id IN (
        'vic_falls_bridge_kuvefc', '_MG_0072_bvcbf7', 'DSC_2297_ey0tap', 'DSC_2475_qm0ifg',
        'IMG_5509_p9s3ww', 'IMG_16221_bkwrjn', 'DSC_0477_lzvqi1',
        'IMG_20190921_104822_79_qkzqdq', 'IMG_3980_ypzjnl', 'IMG_0615_afemi4',
        'IMG_20190921_104822_1_xp9y8y', 'IMG_20190921_104822_2_wkzq2r',
        'IMG_20190921_104822_3_rkzq8s', 'IMG_20190921_104822_4_tkzq9t',
        'DSC_8600_cxuh5l', 'IMG_4074_rnrnpx', 'IMG_20190921_104822_5_ukzqau',
        'DSC_2591_zkfd8a', 'untitled-455_gkodql', 'IMG_20190921_104822_6_vkzqgv',
        'IMG_20190921_104822_76_nkzqdn', 'IMG_20190921_104822_77_okzqdo',
        'IMG_20190921_104822_78_pkzqdp'
    )
) updates
WHERE ci.public_id = updates.public_id;
