trigger event_Trigger on Event (after insert, after update, after delete) {

	//joint after insert/update methods are typically referred to as upsert
	if (trigger.isAfter && (trigger.isInsert || trigger.isUpdate)) event_Methods.afterUpsert(trigger.new);
	//after delete triggers only have old collections; refer to chapter 4
	if (trigger.isAfter && trigger.isDelete) event_Methods.afterDelete(trigger.old);
}