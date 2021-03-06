import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';
import { UserRole } from '@app/user/types/userRole.type';
import { CoreEntity } from '@app/common/entities/core.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import * as bcrypt from 'bcrypt';
import { IsEmail, IsEnum, IsString } from 'class-validator';
import { RestaurantEntity } from '@app/restaurant/entities/restaurant.entity';

@ObjectType()
@Entity('users')
export class UserEntity extends CoreEntity {
  @Column()
  @Field(() => String)
  @IsEmail()
  email: string;

  @Column({ select: false })
  @Field(() => String)
  @IsString()
  password: string;

  @Column()
  @Field(() => UserRole)
  @IsEnum(UserRole)
  role: UserRole;

  @OneToMany(() => RestaurantEntity, (restaurant) => restaurant.owner)
  @Field(() => [RestaurantEntity])
  restaurants: RestaurantEntity[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword?(): Promise<void> {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}
