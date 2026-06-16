import { IsDateString, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class CreateEventDto {
    @IsString({ message: 'Judul event harus berupa text' })
    @IsNotEmpty({ message: 'Judul event wajib diisi dan tidak boleh kosong' })
    @MaxLength(150, { message: 'Judul event tidak boleh lebih dari 150 karakter' })
    title!: string;

    @IsOptional()
    @IsString({ message: 'Deskripsi harus berupa text' })
    description?: string;

    @IsDateString({}, { message: 'Format tanggal harus berupa ISO Date String yang valid' })
    @IsNotEmpty({ message: 'Tanggal pelaksanaan event wajib diisi' })
    date!: string;

    @IsInt({ message: 'Kuota harus berupa angka bulat (integer)' })
    @Min(1, { message: 'Kuota minimal harus berjumlah 1 peserta' })
    @IsNotEmpty({ message: 'Kuota event wajib diisi' })
    quota!: number;
}