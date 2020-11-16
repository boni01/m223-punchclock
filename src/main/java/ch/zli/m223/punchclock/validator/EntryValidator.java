package ch.zli.m223.punchclock.validator;

import ch.zli.m223.punchclock.domain.Entry;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class EntryValidator implements ConstraintValidator<IEntryValidator, Entry> {
    @Override
    public boolean isValid(Entry entry, ConstraintValidatorContext context) {
        return entry.getCheckIn().isBefore(entry.getCheckOut());
    }
}
