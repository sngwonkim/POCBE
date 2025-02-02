import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CreatePocActivityDto } from './dto/create-poc-activity.dto';

@Controller('activity')
@UseGuards(AuthGuard)
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Post('submit-proof')
  async submitProof(
    @Body()
    data: {
      userId: string;
      activityTypeId: string;
      proofData: any;
      signature: string;
      walletAddress: string;
    },
  ) {
    return this.activityService.submitActivityProof(
      data.userId,
      data.activityTypeId,
      data.proofData,
      data.signature,
      data.walletAddress,
    );
  }

  @Post('approve-proof')
  async approveProof(
    @Body()
    data: {
      proofId: string;
      adminId: string;
      adminWalletAddress: string;
      adminSignature: string;
    },
  ) {
    return this.activityService.approveActivityProof(
      data.proofId,
      data.adminId,
      data.adminWalletAddress,
      data.adminSignature,
    );
  }

  @Post('create')
  async createPocActivity(@Body() createPocActivityDto: CreatePocActivityDto) {
    return this.activityService.pocActivityRegistration(createPocActivityDto);
  }
}
