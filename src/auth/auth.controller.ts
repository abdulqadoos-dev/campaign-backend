import {
  Body, Controller, HttpCode, HttpStatus, Post, Get,
  UseGuards,
  Request,
  Res,
  Req,
  UnauthorizedException,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Public } from './constants';
import { CheckTokenExpiryGuard } from './auth.google.guard';
import { Response } from 'express';

@Public()
@Controller()
export class AuthController {
  constructor(private authService: AuthService) { }

  // @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() user) {
    return this.authService.autenticate(user.username, user.password);
  }


  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleLogin() {
    console.log("step::1  - googleLogin")
   }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleLoginCallback(@Request() req, @Res() res: Response) {
    console.log("step::2  - googleLoginCallback")
    const googleToken = req.user.accessToken;
    const googleRefreshToken = req.user.refreshToken;

    res.cookie('access_token', googleToken, { httpOnly: true });
    res.cookie('refresh_token', googleRefreshToken, {
      httpOnly: true,
    });

    res.redirect('http://localhost:3000/auth/profile');
  }

  @UseGuards(CheckTokenExpiryGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    const accessToken = req.cookies['access_token'];
    if (accessToken)
      return (await this.authService.getProfile(accessToken)).data;
    throw new UnauthorizedException('No access token');
  }

  @Get('logout')
  logout(@Req() req, @Res() res: Response) {
    const refreshToken = req.cookies['refresh_token'];
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    this.authService.revokeGoogleToken(refreshToken);
    res.redirect('http://localhost:3000/');
  }


}
