import PricingConfig from '../models/Event.js';
import { AppError } from '../middleware/errorHandler.js';
import logger from '../utils/logger.js';

export async function getEvents(req, res, next) {
  try {
    const config = await PricingConfig.findOne().lean();
    if (!config) {
      throw new AppError('Pricing configuration not found', 404, 'CONFIG_MISSING');
    }
    res.status(200).json({
      success: true,
      data: { events: config.events },
      message: 'Events retrieved successfully',
    });
  } catch (err) {
    next(err);
  }
}

export async function createEvent(req, res, next) {
  try {
    const { name, slug, category, basePrice } = req.body;
    const config = await PricingConfig.findOne();
    if (!config) {
      throw new AppError('Pricing configuration not found', 404, 'CONFIG_MISSING');
    }

    const duplicate = config.events.find((e) => e.slug === slug);
    if (duplicate) {
      throw new AppError('Event with this slug already exists', 409, 'EVENT_EXISTS');
    }

    config.events.push({ slug, name, category, basePrice, isActive: true });
    await config.save();
    logger.info(`Event created: ${slug}`);

    res.status(201).json({
      success: true,
      data: { event: config.events[config.events.length - 1] },
      message: 'Event created successfully',
    });
  } catch (err) {
    next(err);
  }
}

export async function updateEvent(req, res, next) {
  try {
    const { slug } = req.params;
    const { name, category, basePrice, isActive } = req.body;
    const config = await PricingConfig.findOne();
    if (!config) {
      throw new AppError('Pricing configuration not found', 404, 'CONFIG_MISSING');
    }

    const eventIndex = config.events.findIndex((e) => e.slug === slug);
    if (eventIndex === -1) {
      throw new AppError('Event not found', 404, 'EVENT_NOT_FOUND');
    }

    if (name !== undefined) config.events[eventIndex].name = name;
    if (category !== undefined) config.events[eventIndex].category = category;
    if (basePrice !== undefined) config.events[eventIndex].basePrice = basePrice;
    if (isActive !== undefined) config.events[eventIndex].isActive = isActive;

    await config.save();
    logger.info(`Event updated: ${slug}`);

    res.status(200).json({
      success: true,
      data: { event: config.events[eventIndex] },
      message: 'Event updated successfully',
    });
  } catch (err) {
    next(err);
  }
}

export async function deleteEvent(req, res, next) {
  try {
    const { slug } = req.params;
    const config = await PricingConfig.findOne();
    if (!config) {
      throw new AppError('Pricing configuration not found', 404, 'CONFIG_MISSING');
    }

    const eventIndex = config.events.findIndex((e) => e.slug === slug);
    if (eventIndex === -1) {
      throw new AppError('Event not found', 404, 'EVENT_NOT_FOUND');
    }

    const deleted = config.events.splice(eventIndex, 1)[0];
    await config.save();
    logger.info(`Event deleted: ${slug}`);

    res.status(200).json({
      success: true,
      data: { event: deleted },
      message: 'Event deleted successfully',
    });
  } catch (err) {
    next(err);
  }
}

export async function getWorkshops(req, res, next) {
  try {
    const config = await PricingConfig.findOne().select('workshops').lean();
    if (!config) {
      throw new AppError('Pricing configuration not found', 404, 'CONFIG_MISSING');
    }
    res.status(200).json({
      success: true,
      data: { workshops: config.workshops },
      message: 'Workshops retrieved successfully',
    });
  } catch (err) {
    next(err);
  }
}

export async function createWorkshop(req, res, next) {
  try {
    const { name, slug, price } = req.body;
    const config = await PricingConfig.findOne();
    if (!config) {
      throw new AppError('Pricing configuration not found', 404, 'CONFIG_MISSING');
    }

    const duplicate = config.workshops.find((w) => w.slug === slug);
    if (duplicate) {
      throw new AppError('Workshop with this slug already exists', 409, 'WORKSHOP_EXISTS');
    }

    config.workshops.push({ slug, name, price, isActive: true });
    await config.save();
    logger.info(`Workshop created: ${slug}`);

    res.status(201).json({
      success: true,
      data: { workshop: config.workshops[config.workshops.length - 1] },
      message: 'Workshop created successfully',
    });
  } catch (err) {
    next(err);
  }
}

export async function updateWorkshop(req, res, next) {
  try {
    const { slug } = req.params;
    const { name, price, isActive } = req.body;
    const config = await PricingConfig.findOne();
    if (!config) {
      throw new AppError('Pricing configuration not found', 404, 'CONFIG_MISSING');
    }

    const workshopIndex = config.workshops.findIndex((w) => w.slug === slug);
    if (workshopIndex === -1) {
      throw new AppError('Workshop not found', 404, 'WORKSHOP_NOT_FOUND');
    }

    if (name !== undefined) config.workshops[workshopIndex].name = name;
    if (price !== undefined) config.workshops[workshopIndex].price = price;
    if (isActive !== undefined) config.workshops[workshopIndex].isActive = isActive;

    await config.save();
    logger.info(`Workshop updated: ${slug}`);

    res.status(200).json({
      success: true,
      data: { workshop: config.workshops[workshopIndex] },
      message: 'Workshop updated successfully',
    });
  } catch (err) {
    next(err);
  }
}

export async function deleteWorkshop(req, res, next) {
  try {
    const { slug } = req.params;
    const config = await PricingConfig.findOne();
    if (!config) {
      throw new AppError('Pricing configuration not found', 404, 'CONFIG_MISSING');
    }

    const workshopIndex = config.workshops.findIndex((w) => w.slug === slug);
    if (workshopIndex === -1) {
      throw new AppError('Workshop not found', 404, 'WORKSHOP_NOT_FOUND');
    }

    const deleted = config.workshops.splice(workshopIndex, 1)[0];
    await config.save();
    logger.info(`Workshop deleted: ${slug}`);

    res.status(200).json({
      success: true,
      data: { workshop: deleted },
      message: 'Workshop deleted successfully',
    });
  } catch (err) {
    next(err);
  }
}

export async function getPricingConfig(req, res, next) {
  try {
    const config = await PricingConfig.findOne().lean();
    if (!config) {
      throw new AppError('Pricing configuration not found', 404, 'CONFIG_MISSING');
    }
    res.status(200).json({
      success: true,
      data: {
        individualBaseFee: config.individualBaseFee,
        individualExtraFee: config.individualExtraFee,
        team2BaseFee: config.team2BaseFee,
        team2ExtraFee: config.team2ExtraFee,
        team3BaseFee: config.team3BaseFee,
        team3ExtraFee: config.team3ExtraFee,
        maxTechPerRegistration: config.maxTechPerRegistration,
        maxNonTechPerRegistration: config.maxNonTechPerRegistration,
      },
      message: 'Pricing configuration retrieved successfully',
    });
  } catch (err) {
    next(err);
  }
}

export async function updatePricingConfig(req, res, next) {
  try {
    const {
      individualBaseFee, individualExtraFee,
      team2BaseFee, team2ExtraFee,
      team3BaseFee, team3ExtraFee,
      maxTechPerRegistration, maxNonTechPerRegistration,
    } = req.body;
    const config = await PricingConfig.findOne();
    if (!config) {
      throw new AppError('Pricing configuration not found', 404, 'CONFIG_MISSING');
    }

    if (individualBaseFee !== undefined) config.individualBaseFee = individualBaseFee;
    if (individualExtraFee !== undefined) config.individualExtraFee = individualExtraFee;
    if (team2BaseFee !== undefined) config.team2BaseFee = team2BaseFee;
    if (team2ExtraFee !== undefined) config.team2ExtraFee = team2ExtraFee;
    if (team3BaseFee !== undefined) config.team3BaseFee = team3BaseFee;
    if (team3ExtraFee !== undefined) config.team3ExtraFee = team3ExtraFee;
    if (maxTechPerRegistration !== undefined) config.maxTechPerRegistration = maxTechPerRegistration;
    if (maxNonTechPerRegistration !== undefined) config.maxNonTechPerRegistration = maxNonTechPerRegistration;

    await config.save();
    logger.info('Pricing configuration updated');

    res.status(200).json({
      success: true,
      data: { message: 'Pricing configuration updated successfully' },
      message: 'Pricing configuration updated successfully',
    });
  } catch (err) {
    next(err);
  }
}
