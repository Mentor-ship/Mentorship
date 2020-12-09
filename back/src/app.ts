import express, { Application } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import methodOverride from 'method-override';

import 'dotenv/config';

// Importing routers
import LanguageRouter from './routers/LanguageRouter';
import ImageRouter from './routers/ImageRouter';
import InstitutionRouter from './routers/InstitutionRouter';
import SkillRouter from './routers/SkillRouter';
import CVRouter from './routers/CVRouter';
import GroupRouter from './routers/GroupRouter';
import LicenseRouter from './routers/LicenseRouter';
import ExperienceRouter from './routers/ExperienceRouter';
import AchievementRouter from './routers/AchievementRouter';
import CategoryRouter from './routers/CategoryRouter';
import ChargeTypeRouter from './routers/ChargeTypeRouter';
import CountryRouter from './routers/CountryRouter';
import CurrencyRouter from './routers/CurrencyRouter';
import CVandAchievementsRouter from './routers/CVandAchievementsRouter';
import CVandLicenseRouter from './routers/CVandLicenseRouter';
import CVandSkillRouter from './routers/CVandSkillRouter';
import CVandLanguageRouter from './routers/CVandLanguageRouter';
import DutyTypeRouter from './routers/DutyTypeRouter';
import EducationRouters from './routers/EducationRouters';
import ExperienceTypeRouter from './routers/ExperienceTypeRouter';
import LanguageLevelRouter from './routers/LanguageLevelRouter';
import TimeTypesRouter from './routers/TimeTypesRouter';

const app: Application = express();

const connect = mongoose.connect(process.env.MONGO_URI!, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.on('error', (error) => console.log(error));
connection.once('open', () => {
  console.log('Connected to Database');
});

// Middlewares
app.use(cors());
app.use(express.json());
// app.use(methodOverride('_method'));

app.get('/', (req, res) => {
  res.json({
    message: 'Hello world😎',
  });
});

// Applying imported routers in routes
app.use('/languages', LanguageRouter);
app.use('/images', ImageRouter);
app.use('/institutions', InstitutionRouter);
app.use('/skills', SkillRouter);
app.use('/cvs', CVRouter);
app.use('/groups', GroupRouter);
app.use('/licenses', LicenseRouter);
app.use('/experiences', ExperienceRouter);
app.use('/achievements', AchievementRouter);
app.use('/categories', CategoryRouter);
app.use('/charge_types', ChargeTypeRouter);
app.use('/countries', CountryRouter);
app.use('/currencies', CurrencyRouter);
app.use('/cv_and_achievements', CVandAchievementsRouter);
app.use('/cv_and_licenses', CVandLicenseRouter);
app.use('/cv_and_skills', CVandSkillRouter);
app.use('/cv_and_languages', CVandLanguageRouter);
app.use('/duty_types', DutyTypeRouter);
app.use('/educations', EducationRouters);
app.use('/experience_types', ExperienceTypeRouter);
app.use('/language_levels', LanguageLevelRouter);
app.use('/time_types', TimeTypesRouter);

// Listening to the port
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
