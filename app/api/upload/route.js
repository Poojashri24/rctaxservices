import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files');

    if (!files || files.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No files provided for upload' },
        { status: 400 }
      );
    }

    const uploadedInfo = [];

    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const fileName = file.name;
      const fileType = file.type;
      const fileSize = file.size;

      // In production, you would upload to Vercel Blob / AWS S3:
      // const blob = await put(fileName, buffer, { access: 'public' });
      // uploadedInfo.push({ url: blob.url, name: fileName });
      
      console.log(`API file received: Name=${fileName}, Type=${fileType}, Size=${fileSize} bytes`);
      uploadedInfo.push({ name: fileName, size: fileSize, dataUrl: '#' });
    }

    return NextResponse.json({
      success: true,
      message: 'Files processed successfully',
      files: uploadedInfo
    });
  } catch (error) {
    console.error('Upload API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
