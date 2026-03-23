import { pgTable, serial, integer, text, uuid, doublePrecision } from 'drizzle-orm/pg-core';
export const task = pgTable('task', {
	id: serial('id').primaryKey(),
	title: text('title').notNull(),
	priority: integer('priority').notNull().default(1)
});
export * from './auth.schema';

//location table to join with map and asset
export const location = pgTable('location', {
	id: uuid('id').primaryKey().defaultRandom(),
	name: text('name').notNull(),
});

export const map = pgTable('map', {
	id: uuid('id').primaryKey().defaultRandom(),
	name: text('name').notNull(),
	imageUrl: text('image_url').notNull(),
	locationID: uuid('location_id').references(() => location.id).notNull(),
});
export const asset = pgTable('asset', {
	id: uuid('id').primaryKey().defaultRandom(),
	name: text('name').notNull(),
	locationID: uuid('location_id').references(() => location.id).notNull(),
	mapID: uuid('map_id').references(() => map.id).notNull(),  // New: link to specific map
	x: doublePrecision('x').notNull(),
	y: doublePrecision('y').notNull(),
});