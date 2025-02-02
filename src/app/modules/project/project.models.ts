import mongoose, { Schema } from 'mongoose';
import { IProject, ProjectModel } from './project.interface';

const companySchema = new Schema({
    name: { type: String },
    address: { type: String },
    gstNumber: { type: String },
});

const clientSchema = new Schema({
    name: { type: String },
    mobileNumber: { type: String },
    company: { type: companySchema },
});

const projectSchema = new Schema<IProject>(
    {
        projectName: { type: String },
        address: { type: String },
        city: { type: String },
        location: { type: String },
        startDate: { type: String }, // ISO 8601 format (YYYY-MM-DD)
        endDate: { type: String }, // ISO 8601 format (YYYY-MM-DD)
        partiesInvolved: [{ type: Schema.Types.ObjectId, ref: 'Party' }], // Assuming you have a Party model
        client: { type: clientSchema },
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
        },
    },
);

// Add any virtual properties here if needed
projectSchema.virtual('duration').get(function (this: IProject) {
    if (this.startDate && this.endDate) {
        const start = new Date(this.startDate);
        const end = new Date(this.endDate);
        const durationInDays =
            (end.getTime() - start.getTime()) / (1000 * 3600 * 24);
        return Math.round(durationInDays);
    }
    return null;
});

// Add any instance methods here if needed
projectSchema.methods.isActive = function (this: IProject): boolean | null {
    if (this.startDate && this.endDate) {
        const currentDate = new Date();
        const startDate = new Date(this.startDate);
        const endDate = new Date(this.endDate);
        return currentDate >= startDate && currentDate <= endDate;
    }
    return null;
};

// Add any static methods here if needed
projectSchema.statics.findByCity = function (city: string) {
    return this.find({ city: city });
};

export const Project = mongoose.model<IProject, ProjectModel>(
    'Project',
    projectSchema,
);
