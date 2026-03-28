import { pgTable, serial, integer, text, uuid, doublePrecision, jsonb, timestamp } from 'drizzle-orm/pg-core';
import { organization, user } from './auth.schema.ts';

export const task = pgTable('task', {
	id: serial('id').primaryKey(),
	title: text('title').notNull(),
	priority: integer('priority').notNull().default(1)
});

// location table to join with map and asset
export const location = pgTable('location', {
	id: uuid('id').primaryKey().defaultRandom(),
	name: text('name').notNull(),
	organizationId: text('organization_id')
		.notNull()
		.references(() => organization.id, { onDelete: 'cascade' }),
	createdBy: text('created_by')
		.notNull()
		.references(() => user.id),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const map = pgTable('map', {
	id: uuid('id').primaryKey().defaultRandom(),
	name: text('name').notNull(),
	imageUrl: text('image_url').notNull(),
	locationId: uuid('location_id')
		.references(() => location.id, { onDelete: 'cascade' })
		.notNull(),
	organizationId: text('organization_id')
		.notNull()
		.references(() => organization.id, { onDelete: 'cascade' }),
	createdBy: text('created_by')
		.notNull()
		.references(() => user.id),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const asset = pgTable('asset', {
	id: uuid('id').primaryKey().defaultRandom(),
	name: text('name').notNull(),
	description: text('description'),
	locationId: uuid('location_id')
		.references(() => location.id, { onDelete: 'cascade' })
		.notNull(),
	mapId: uuid('map_id')
		.references(() => map.id, { onDelete: 'cascade' })
		.notNull(),
	organizationId: text('organization_id')
		.notNull()
		.references(() => organization.id, { onDelete: 'cascade' }),
	x: doublePrecision('x').notNull(), // Use 0-100 percentage
	y: doublePrecision('y').notNull(),
	customFields: jsonb('custom_fields').default({}).notNull(),
	createdBy: text('created_by')
		.notNull()
		.references(() => user.id),
	updatedBy: text('updated_by')
		.references(() => user.id),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export * from './auth.schema.ts';
