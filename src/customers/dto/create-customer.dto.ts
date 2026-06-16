import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCustomerDto {
    @IsString({ message: 'Nama harus berupa text' })
    @IsNotEmpty({ message: 'Nama wajib diisi dan tidak boleh kosong' })
    @MaxLength(100, { message: 'Nama tidak boleh lebih dari 100 karakter' })
    name!: string;

    @IsEmail({}, { message: 'Format email tidak valid' })
    @IsNotEmpty({ message: 'Email wajib diisi dan tidak boleh kosong' })
    @MaxLength(150, { message: 'Email tidak boleh lebih dari 150 karakter' })
    email!: string;

    @IsString({ message: 'Password harus berupa text' })
    @IsNotEmpty({ message: 'Password wajib diisi dan tidak boleh kosong' })
    @MinLength(6, { message: 'Password minimal harus berjumlah 6 karakter' })
    @MaxLength(255, { message: 'Password terlalu panjang' })
    password!: string;

    @IsOptional()
    @IsString({ message: 'Alamat harus berupa text' })
    address?: string;
}