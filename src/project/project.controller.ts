import { Controller, Post, Body, Put, Param, UseGuards } from '@nestjs/common';
import { ProjectService } from './project.service';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('project')
@UseGuards(AuthGuard)
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  async createProject(
    @Body()
    data: {
      title: string;
      description: string;
      leaderId: string;
      memberData: any;
    },
  ) {
    return this.projectService.createProject(
      data.title,
      data.description,
      data.leaderId,
      data.memberData,
    );
  }

  @Put('contribution/:projectId')
  async updateContribution(
    @Param('projectId') projectId: string,
    @Body()
    data: {
      userId: string;
      contributionScore: number;
    },
  ) {
    return this.projectService.updateProjectContribution(
      projectId,
      data.userId,
      data.contributionScore,
    );
  }

  @Post('freerider-vote')
  async submitFreeriderVote(
    @Body()
    data: {
      projectId: string;
      voterId: string;
      targetUserId: string;
      voteTxHash: string;
    },
  ) {
    return this.projectService.submitFreeriderVote(
      data.projectId,
      data.voterId,
      data.targetUserId,
      data.voteTxHash,
    );
  }

  @Post('complete/:projectId')
  async completeProject(
    @Param('projectId') projectId: string,
    @Body()
    data: {
      completionStatus: number;
      verificationTxHash: string;
      ipfsHash: string;
    },
  ) {
    return this.projectService.completeProject(
      projectId,
      data.completionStatus,
      data.verificationTxHash,
      data.ipfsHash,
    );
  }
}